import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import Sidebar from "../../components/layout/Sidebar"
import { useAuth } from "../../context/auth"
import { Card, Spinner } from "flowbite-react"
import { BiMovie } from "react-icons/bi"
import axios from "axios"
// import OrderGraph from "../../components/OrderGraph"
import { Line } from "react-chartjs-2"
// import items from "razorpay/dist/types/items"
import {
  Chart as chartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

chartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const getMovie = "http://localhost:8080/api/v1/movie/get-movie"
const getUsers = "http://localhost:8080/api/v1/auth/users"
function AdminDashboard() {
  const [auth] = useAuth()
  const [totalMovies, setTotalMovies] = useState(0) // State for total movie count
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])
  const [graphData, setGraphData] = useState({})

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/all-orders/"
        )
        const data = response.data
        console.log("fetchGraph", data)

        if (Array.isArray(data) && data.length > 0) {
          setGraphData({
            labels: "abc",
            datasets: [
              {
                label: "order",
                data: ["assd"],
                fill: true,
                borderColor: "rgba(255, 99, 132)",
              },
            ],
          })
        }
      } catch (error) {
        // Handle error
        console.error(error)
      }
    }

    fetchGraph()
  }, [])

  const getAllUsers = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(getUsers)
      if (data.success) {
        console.log("users========>", data)
        const users = data.users
        setUsers(users) // Set the total movie count
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error, "something went wrong getting all genres")
    }
  }

  const getAllMovies = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(getMovie)
      if (data.success) {
        const movies = data.movies
        setTotalMovies(movies.length) // Set the total movie count
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error, "something went wrong getting all genres")
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)

      const categoryResponse = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      )
      const productResponse = await axios.get(
        "http://localhost:8080/api/v1/movie/get-movie"
      )
      const categories = categoryResponse.data.category
      const movies = productResponse.data.movies

      // Combine categories with their movies
      const categoriesWithMovies = categories.map((category) => {
        const categoryMovies = movies.filter(
          (movie) => movie.category._id === category._id
        )
        return {
          ...category,
          movies: categoryMovies,
        }
      })
      console.log(categoriesWithMovies)
      // Set the state with categories and movies
      setCategories(categoriesWithMovies)
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getAllMovies()
    fetchData()
    getAllUsers()
  }, [])

  const [columns, setColumns] = useState(["Name", "Email", "Mobile"])

  return (
    <Layout>
      <div className="container-fluid  p-3">
        <div className="grid ">
          <div className="flex flex-wrap ">
            <div className="md:w-1/2 lg:w-1/3">
              <div className="md:relative z-50">
                <Sidebar />
              </div>
            </div>
          </div>
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-wrap lg:ml-48">
              <div
                className=" mx-4 lg:w-96  shadow-3xl    "
                style={{ borderRadius: 20 }}
              >
                <div className="h-16 bg-[#1C1C1C]    px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-[#666666] mb-3">
                    TOTAL USERS
                  </h1>
                  <p className="leading-relaxed font-bold text-xl mb-3">
                    {users.length}
                  </p>
                </div>
              </div>
              <div className="mx-4 lg:w-96  shadow-3xl  rounded ">
                <div className="h-16 bg-[#1C1C1C]  px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-[#666666] mb-3">
                    total movie
                  </h1>
                  <p className="leading-relaxed font-bold text-xl mb-3">
                    {totalMovies}
                  </p>
                </div>
              </div>
              <div className="mx-4 lg:w-96  shadow-3xl  rounded ">
                <div className="h-16 bg-[#1C1C1C]  px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-[#666666] mb-3">
                    SUBSCRIBE USER
                  </h1>
                  <p className="leading-relaxed font-bold text-xl mb-3">200</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container px-5 py-0 mx-auto">
            <div className="flex flex-wrap lg:ml-48">
              <div className=" p-4 w-1/2  shadow-3xl  rounded-lg  ">
                <div>
                  <table className="table-auto sm:table-auto ">
                    <thead className="text-[#666666] ">
                      <tr>
                        {columns.map((column) => (
                          <th className="" key={column}>
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="py-4">
                      {loading ? (
                        <tr>
                          <td colSpan={3}>
                            <Spinner aria-label="Default status example" />
                          </td>
                        </tr>
                      ) : (
                        users?.map((c) => (
                          <tr className="" key={c._id}>
                            <td className="px-3 py-3"> {c.name}</td>

                            <td className="px-3 py-3">{c.email}</td>
                            <td className=" px-3 py-3">{c.phone}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-4 w-1/2 text-left shadow-3xl  ">
                <div className="h-full bg-[#1C1C1C] text-left  px-8 pt-16 pb-24 rounded-lg overflow-hidden  relative">
                  <h3 className="title-font sm:text-2xl text-xl font-medium  text-[#666666] mb-3">
                    Genre
                  </h3>
                  <div className="">
                    <div className="flex flex-col text-left  ">
                      {categories ? (
                        categories.map((category) => (
                          <div
                            key={category._id}
                            className="mx-14 py-3 bg-[#181818] text-[#666666] my-2 flex justify-start   rounded"
                          >
                            <div
                              className="align-items-center"
                              style={{ backgroundColor: "#F5A509" }}
                            >
                              <BiMovie
                                alt={category.name}
                                width={200}
                                height={200}
                                className="m-2"
                                style={{ color: "#fff" }}
                              />
                            </div>
                            <div>
                              <h1 className="mx-5 font-medium">
                                {category.name}
                              </h1>
                              <ul className="mx-5 font-normal">
                                {category.movies.map((movie) => (
                                  <li key={movie._id} className="text-white">
                                    {movie.title}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h1> loading</h1>
                      )}
                    </div>
                  </div>
                  {/* <OrderGraph /> */}
                  <div>
                    {/* <Line
                      data={graphData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: "top" },
                          title: { display: true, text: "Revenue" },
                        },
                      }}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
