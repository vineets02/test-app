import React, { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import { useAuth } from "../context/auth"
// import { useWatchlist } from "../context/watch"
import { useNavigate } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { useRent } from "../context/rent"
import DropIn from "braintree-web-drop-in-react"
import axios from "axios"
import { number } from "yup"
import SubscriptionButton from "../components/SubscriptionButton"

function RentPage() {
  const [auth, setAuth] = useAuth()
  const [rent, setRent] = useRent()
  const [clientToken, setclientToken] = useState("")
  const [instance, setInstance] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { name, email, contact } = auth.user
  const totalPrice = () => {
    try {
      let total = 0 // Change to let to allow reassignment
      rent?.map((item) => {
        total = total + item.price
      })
      console.log("total", total)
      return total.toLocaleString("en-EN", {
        style: "currency",
        currency: "INR",
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "https://tmp-h86h.onrender.com/api/v1/movie/braintree/token"
      )
      console.log(data?.clientToken)
      setclientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToken()
  }, [auth?.token])

  const handlePayment = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod()
      const { data } = await axios.post(
        "https://tmp-h86h.onrender.com/api/v1/movie/braintree/payment",
        { nonce, rent }
      )
      console.log("data", data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenRazorpay = (data, title, movie) => {
    const options = {
      key: "rzp_test_9rWvB88vcbBbqM", // Enter the Key ID generated from the Dashboard
      amount: Math.round(data?.price * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: title,
      description: "Test Transaction",
      // image: "https://example.com/your_logo",
      order_id: data?.id, //T
      prefill: {
        name: name, // Pass user's name dynamically
        email: email, // Pass user's email dynamically
        contact: contact, // Pass user's contact number dynamically
        // Add other optional prefill fields if needed
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#f5a40a",
      },
      handler: function (response) {
        console.log(response, "86")
        axios
          .post("http://localhost:8080/verify", {
            response: response,
          })
          .then((res) => {
            console.log(res, "89")
            localStorage.removeItem("rent")
            setRent([])
            axios
              .put("http://localhost:8080/", {
                userId: auth.user._id,
                subscription: true,
              })
              .then((response) => {
                console.log("Subscription updated successfully")
              })
              .catch((error) => {
                console.log("Failed to update subscription:", error)
              })
            navigate(`/movie/${movie._id}`, {
              state: movie,
            })
          })
          .catch((err) => {
            console.log(err)
          })
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handlePay = async (price, title, movie) => {
    const _data = { amount: price }
    axios
      .post("http://localhost:8080/orders", _data)
      .then((res) => {
        console.log(res.data, "72")
        handleOpenRazorpay(res.data.data, title, movie)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-center font-extrabold">{`Hello ${
            auth?.token && auth?.user?.name
          }`}</h1>
        </div>
        <div>
          {rent?.length > 0
            ? `you have ${rent.length} movies in your watchlist ${
                auth?.token ? "" : "plese login"
              }`
            : "your watchlist is empty"}
        </div>
        <div className="flex  ">
          <div className=" w-auto flex-col">
            {rent.map((movie, index) => (
              <div key={index} className="flex">
                {/* <MovieCard key={index} movie={movie} /> */}
                <div className="w-1/2">
                  <img
                    src={`https://tmp-h86h.onrender.com/api/v1/movie/movie-photo/${movie._id}`}
                    className="banner mx-3 "
                    style={{
                      width: "90%",
                      // height: "100%",
                      objectFit: "contain",
                      // backgroundSize: "cover",
                      // backgroundImage: `url(http://localhost:8080/api/v1/movie/movie-photo/${movie._id})`,
                      // backgroundPosition: "center",
                    }}
                  />
                </div>
                <div className="banner_contents w-1/2">
                  <h1 className=" font-bold text-2xl">
                    {movie?.title}
                    {` `}|{` `} A Film by {` `}
                    {movie?.director}
                  </h1>
                  {/* <div>
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                  </div> */}
                  <h1 className="banner_description">
                    {`${movie?.description}`}
                  </h1>
                </div>
                {/* <SubscriptionButton /> */}
                {/* <div className="banner--fadeButton" /> */}
                <button
                  className="bg-orange-400 rounded p-2 my-2"
                  onClick={() => handlePay(movie.price, movie.title, movie)}
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>
          <div className="w-auto">
            <div className="text-white">
              {" "}
              <h4 className="text-3xl py-2">Rent Summery</h4>
              <p className="py-1">total | checkout | payment</p>
              <hr />
              <p>{`total ${totalPrice()}`}</p>
            </div>
          </div>
          {/* <SubscriptionButton /> */}
          {/* <div>
            {!clientToken || !rent?.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    googlePay: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="bg-orange-400 rounded p-2"
                  onClick={handlePayment}
                  // disabled={!loading || !instanse}
                >
                  {loading ? "Processing...." : "Make Payment"}
                </button>
              </>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default RentPage
