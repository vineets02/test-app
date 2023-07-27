import React from "react"
import { AiFillPlayCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth"
import { useRent } from "../context/rent"

const NewCard = ({ movie }) => {
  const [auth] = useAuth()
  const navigate = useNavigate()
  const [rent, setRent] = useRent()
  const handleMovieDetails = (movie) => {
    if (auth?.user?.subscription) {
      // navigate("/dashboard/user/rent", {
      //   state: movie,
      // })
      navigate(`/movie/${movie._id}`, {
        state: movie,
      })
    } else {
      setRent([...rent, movie])
      localStorage.setItem("rent", JSON.stringify([...rent, movie]))
      // alert("Movie rented successfully")
      navigate(`/dashboard/user/rent`)
    }
  }
  return (
    <div className="mx-auto">
      <div className=" z-50 min-w-[150px]cursor-pointer transition duration-200 ease-out h-44 xs:hover:scale-110 md:hover:scale-125 lg:hover:scale-125 lg:hover:screen-gray-800">
        <img
          src={`http://localhost:8080/api/v1/movie/movie-photo/${movie._id}`}
          alt={movie.title}
          className=" rounded-lg  my-5 md:rounded bg-black"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
          onClick={() => handleMovieDetails(movie)}
        />

        {JSON.stringify(auth?.user?.subscription)}
      </div>
    </div>
  )
}

export default NewCard
