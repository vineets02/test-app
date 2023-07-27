import axios from "axios"
import React, { useEffect, useState } from "react"

function Thumbnail() {
  const [movies, setMovies] = useState()
  const getAllBanner = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/movie/get-movie"
      )
      const allMovies = data.movies // Assuming the movies are returned in an array
      console.log("allMovies thumb", allMovies)
      //   const randomMovie =
      //     allMovies[Math.floor(Math.random() * allMovies.length)]

      //   console.log("allMovies", allMovies)
      setMovies(allMovies)
      // Filter the movies by category
      //   if (movieDetails && movieDetails?.category) {
      //     // Filter the movies by category
      //     const filteredMovies = allMovies.filter(
      //       (movie) => movie.category.slug === movieDetails?.category.slug
      //     )
      //     setFilteredMovie(filteredMovies)

      //   console.log("filteredMovies=============", filteredMovies)
      // Set the filtered movies to the state
      // setMovies(filteredMovies)
      //   }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBanner()
  }, [])
  return (
    <div>
      <div
        className={`relative h-80 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
        // onClick={handleLogin}
        // setCurrentMovie(movie)
        // setShowModal(true)
      >
        <p className="text-white mb-100">{movies.title}</p>

        <img
          src={`http://localhost:8080/api/v1/movie/movie-photo/${movies._id}`}
          className="rounded-sm object-cover md:rounded"
          layout="fill"
        />
      </div>
    </div>
  )
}

export default Thumbnail
