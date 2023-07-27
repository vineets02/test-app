import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "react-modal"
import "./banner.css"
import "./modals.css"
import Modals from "./Modals"
import ReactPlayer from "react-player"
import { AiOutlinePlus } from "react-icons/ai"
Modal.setAppElement("#root")
function Banner() {
  // const [modalOpen, setModalOpen] = useState(false)
  const [banner, setBanner] = useState(null)
  const navigate = useNavigate()
  const playerRef = useRef(null)

  const [isModalOpen, setModalOpen] = useState(false)

  const handleOpenModal = (movie) => {
    setModalOpen(true)
    // navigate(`/movie/${movie._id}`, {
    //   state: movie,
    // })
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }
  // const handleMovieDetails = (movie) => {}

  const getAllBanner = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/movie/get-movie"
      )
      const allMovies = data.movies // Assuming the movies are returned in an array
      console.log("allMovies", allMovies)
      // const randomMovie =
      //   allMovies[Math.floor(Math.random() * allMovies.length)]

      // console.log("randomMovie", randomMovie)
      // setBanner(randomMovie)
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
  const [movieDetails, setMovieDetails] = useState("")
  // const [filteredmovie, setFilteredMovie] = useState([])
  // useEffect(() => {
  //   const fetchGenreData = async () => {
  //     try {
  //       if (location.state) {
  //         // Check if location state contains the genre data
  //         const genreData = location.state
  //         console.log(genreData)

  //         setMovieDetails(genreData)
  //       } else {
  //         // Fetch the genre data from the API
  //         const response = await axios.get(
  //           `https://tmp-h86h.onrender.com/api/v1/movie/get-movie/${slug}`
  //         )
  //         const genreData = response.data.data
  //         console.log(genreData)
  //         setMovieDetails(genreData)
  //         console.log(genreData)
  //       }
  //     } catch (error) {
  //       console.log(error, "something went wrong getting the genre data")
  //     }
  //   }
  // })

  useEffect(() => {
    getAllBanner()
    const interval = setInterval(() => {
      getAllBanner() // Fetch random movie at regular intervals

      // Cleanup function to stop the loop when the component unmounts
      return () => clearInterval(interval)
    }, 60000) // Fetch a new random movie every 5 seconds

    return () => clearInterval(interval) // C
  }, [])

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string
  }

  return (
    <div>
      {
        banner && (
          <header
            className="banner"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(http://localhost:8080/api/v1/movie/movie-photo/${banner._id})`,
              backgroundPosition: "center center",
            }}
          >
            <div className="banner_contents">
              <h1 className="banner_title">{banner?.title}</h1>
              <div>
                <button
                  className="banner_button"
                  onClick={() => handleOpenModal(banner)}
                >
                  Watch Trailer
                </button>
                {/* <button className="banner_button">My List</button> */}
              </div>
              <h1 className="banner_description">
                {/* {truncate(`${banner?.description}`, 100)} */}
              </h1>
            </div>
            <div className="banner--fadeButton" />
          </header>
        )

        /* <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
          <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
            Display the movie backdrop or poster image
            <img
              src={`http://localhost:8080/api/v1/movie/movie-photo/${banner._id}`}
              alt={banner?.title || banner?.name || banner?.original_name}
              width="100%"
              height="720px"
              className="max-w-[100%]"
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </div>

          <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
            {banner?.title}
          </h1>
          <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
            {banner?.description}
          </p>
          <div className="flex space-x-3">
            <button
              className="bannerButton bg-white p-2 rounded px-4 text-black"
              onClick={() => handleMovieDetails(banner)}
            >
              Play
            </button>

            <button
              className="bannerButton bg-[gray]/70 p-2 rounded px-4"
              onClick={openModal}
            >
              Info
            </button>
          </div>
        </div> */
      }
      <Modals
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)", // Customize the overlay color
          },
          content: {
            backgroundColor: "#000", // Customize the modal background color
            width: "50%", // Customize the modal width
            height: "fit-content", // Customize the modal height
            margin: "auto", // Center the modal horizontally
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <div className="bg-[#121212]">
          <ReactPlayer
            url={`http://localhost:8080/api/v1/movie/movie-trailer/${banner._id}`}
            // light={
            // true
            // <img
            //   src={`http://localhost:8080/api/v1/movie/movie-photo/${movieDetails._id}`}
            //   width="90%"
            //   className=" object-cover "
            // />
            // }
            ref={playerRef}
            // volume={1}
            previewTabIndex={0}
            controls={true} // Disable default controls
            width="100%"
            height="100%"
            className="react-player"
            // volume={volume}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                  disableRemotePlayback: true,
                },
              },
            }}
          />
          <div className="banner--fadeButtons" />
          <div className="mx-5 ">
            <h1 className=" font-semibold sm:text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl z-50 absolute  -mt-5">
              {banner?.title}
            </h1>
            <div className="flex py-2   z-50 relative -mt-24   ">
              {/* <div className="flex-1 flex items-center justify-center  sm:bg-white  sm:rounded sm:text-slate-500 "> */}
              <button className="px-10 py-2 pb-3 bg-white  rounded text-black">
                Rent movie at
                {banner.price}
              </button>
              {/* </div> */}
              <div className=" flex items-center ms-16 justify-center bg-white p-2  rounded-full text-black">
                {/* <button className="px-2 py-2 "> */}
                <AiOutlinePlus size={18} className=" " />
                {/* </button> */}
              </div>
            </div>

            <div className="justify-start mx-0 z-50 relative mt-8  ">
              <div className="flex mx-0">
                <div className="flex items-center justify-center text-sm text-white">
                  {/* {banner.duration && banner.duration} */}
                  <span className="align-items-center my-1 mx-1">
                    {/* <BiTimeFive /> */}
                    <span className="mx-0 align-items-center justify-center flex text-sm text-white">
                      &#x2022;{" "}
                    </span>
                  </span>
                </div>

                <div className=" flex items-center justify-center text-sm text-white capitalize">
                  {/* {banner.contenttype && banner.contenttype.contenttype} */}
                </div>
                <div className="flex items-center justify-center text-smtext-white">
                  <span className="align-items-center my-1 mx-1">
                    {/* <BiTimeFive /> */}
                    <span className="  flex text-sm text-white">&#x2022; </span>
                  </span>
                  {/* {banner.category && banner.category.name} */}
                </div>
              </div>
            </div>
            <div className="py-10">
              {truncate(`${banner?.description}`, 100)}
            </div>
          </div>
        </div>
      </Modals>
      {/* <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Movie Info"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)", // Customize the overlay color
          },
          content: {
            backgroundColor: "#000", // Customize the modal background color
            width: "50%", // Customize the modal width
            height: "fit-content", // Customize the modal height
            margin: "auto", // Center the modal horizontally
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {/* Content of the modal */}
      {/* <h2>{banner?.title}</h2>
        <p>{banner?.description}</p>

        <button onClick={closeModal}>Close</button>
      </Modal>  */}
    </div>
  )
}

export default Banner
