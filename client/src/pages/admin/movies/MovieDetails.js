import React, { useEffect, useRef, useState } from "react"
import Layout from "../../../components/layout/Layout"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import ReactPlayer from "react-player/lazy"
import styles from "./Movie.module.css"
import { AiOutlineArrowLeft, AiOutlinePlusCircle } from "react-icons/ai"
import { HiOutlineFastForward } from "react-icons/hi"
import { BsSkipBackward, BsSkipForward } from "react-icons/bs"
// import HoverVideoPlayer from "react-hover-video-player"
// import { Accordion, Button, Dropdown } from "flowbite-react"
// import { BiShare } from "react-icons/bi"
// import {
//   FacebookIcon,
//   FacebookShareButton,
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from "react-share"
import { BsFillShareFill } from "react-icons/bs"
import { useWatchlist } from "../../../context/watch"
import Swal from "sweetalert2"
// import { IoAddCircleOutline } from "react-icons/io5"

// const FullScreen = ({ children }) => {
//   const fullScreenRef = useRef(null)

// const enterFullScreen = () => {
//   if (fullScreenRef.current && fullScreenRef.current.requestFullscreen) {
//     fullScreenRef.current.requestFullscreen()
//   }
// }

// const exitFullScreen = () => {
//   if (
//     document &&
//     (document.fullscreenElement ||
//       document.mozFullScreenElement ||
//       document.webkitFullscreenElement ||
//       document.msFullscreenElement)
//   ) {
//     if (document.exitFullscreen) {
//       document.exitFullscreen()
//     } else if (document.mozCancelFullScreen) {
//       document.mozCancelFullScreen()
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen()
//     } else if (document.msExitFullscreen) {
//       document.msExitFullscreen()
//     }
//   }
// }
//   return (
//     <div ref={fullScreenRef}>
//       <button onClick={enterFullScreen}>Fullscreen</button>
//       {children}
//       <button onClick={exitFullScreen}>Exit Fullscreen</button>
//     </div>
//   )
// }

function MovieDetails() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const location = useLocation()
  // const [volume, setVolume] = useState(1)
  // const [isFullScreen, setIsFullScreen] = useState(false)
  // const [selectedQuality, setSelectedQuality] = useState(null)
  // const videoQualities = [
  //   { label: "Low", value: "360" },
  //   { label: "Medium", value: "480" },
  //   { label: "High", value: "720" },
  //   { label: "HD", value: "1080" },
  // ]

  //   const params = useParams()

  const [movieDetails, setMovieDetails] = useState("")
  const [filteredmovie, setFilteredMovie] = useState([])
  const [watchlist, setWatchlist] = useWatchlist()
  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        if (location.state) {
          // Check if location state contains the genre data
          const genreData = location.state
          console.log(genreData)

          setMovieDetails(genreData)
        } else {
          // Fetch the genre data from the API
          const response = await axios.get(
            `http://localhost:8080/api/v1/movie/get-movie/${slug}`
          )
          const genreDatas = response.data.data
          console.log("genreData======", genreDatas)
          setMovieDetails(genreDatas)
          console.log("genredata is set", genreDatas)
        }
      } catch (error) {
        console.log(error, "something went wrong getting the genre data")
      }
    }

    // const getAllMovies = async () => {
    //   try {
    //     const { data } = await axios.get(
    //       "http://localhost:8080/api/v1/movie/get-movie"
    //     )
    //     const allMovies = data.movies // Assuming the movies are returned in an array
    //     console.log("allMovies", allMovies)
    //     // Filter the movies by category
    //     if (movieDetails && movieDetails?.category) {
    //       // Filter the movies by category
    //       const filteredMovies = allMovies.filter(
    //         (movie) => movie.category.slug === movieDetails?.category.slug
    //       )
    //       setFilteredMovie(filteredMovies)

    //       console.log("filteredMovies=============", filteredMovies)
    //       // Set the filtered movies to the state
    //       // setMovies(filteredMovies)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    fetchGenreData()
    // getAllMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieDetails, slug])

  const playerRef = useRef(null)
  const handleForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() + 10,
        "seconds"
      )
    }
  }

  const handleBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        playerRef.current.getCurrentTime() - 10,
        "seconds"
      )
    }
  }
  // const handlePlay = () => {
  //   playerRef.current?.seekTo(0) // Start from the beginning
  //   playerRef.current?.getInternalPlayer()?.play()
  // }

  // const handlePause = () => {
  //   playerRef.current?.getInternalPlayer()?.pause()
  // }
  // const handleVolumeChange = (e) => {
  //   const newVolume = parseFloat(e.target.value)
  //   setVolume(newVolume)
  // }
  // const handleFullScreen = () => {
  //   const playerContainer = playerRef.current.container

  //   if (playerContainer.requestFullscreen) {
  //     playerContainer.requestFullscreen()
  //   } else if (playerContainer.mozRequestFullScreen) {
  //     playerContainer.mozRequestFullScreen()
  //   } else if (playerContainer.webkitRequestFullscreen) {
  //     playerContainer.webkitRequestFullscreen()
  //   } else if (playerContainer.msRequestFullscreen) {
  //     playerContainer.msRequestFullscreen()
  //   }

  //   setIsFullScreen(true)
  // }

  // const handleExitFullScreen = () => {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen()
  //   } else if (document.mozCancelFullScreen) {
  //     document.mozCancelFullScreen()
  //   } else if (document.webkitExitFullscreen) {
  //     document.webkitExitFullscreen()
  //   } else if (document.msExitFullscreen) {
  //     document.msExitFullscreen()
  //   }

  //   setIsFullScreen(false)
  // }
  // const handleQualityChange = (value) => {
  //   setSelectedQuality(value)
  // }

  // const renderQualityOptions = () => {
  //   return videoQualities.map((option) => (
  //     <option key={option.value} value={option.value}>
  //       {option.label}
  //     </option>
  //   ))
  // }

  // const renderVideoSources = () => {
  //   return videoQualities.map((option) => (
  //     <source
  //       key={option.value}
  //       src={option.url}
  //       type={`video/mp4; codecs="avc1.${option.value}"`}
  //     />
  //   ))
  // }

  const handleShare = (movieDetails) => {
    if (movieDetails?._id) {
      const shareableLink = `http://localhost:3000/movie/${movieDetails._id}`
      try {
        navigator.clipboard.writeText(shareableLink)
        alert("Link copied to clipboard!")
      } catch (error) {
        // Fallback for browsers that do not support the Clipboard API
        const fallbackInput = document.createElement("input")
        fallbackInput.style.position = "fixed"
        fallbackInput.style.opacity = 0
        fallbackInput.value = shareableLink
        document.body.appendChild(fallbackInput)
        fallbackInput.select()
        document.execCommand("copy")
        document.body.removeChild(fallbackInput)
        alert("Link copied to clipboard!")
      }
      console.log("movieDetails", movieDetails)
    }
  }
  // const handleMovieDetails = (movie) => {
  //   navigate(`/movie/${movie._id}`, {
  //     state: movie,
  //   })
  // }

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string
  }

  const handleWatchlist = () => {
    setWatchlist([...watchlist, movieDetails])
    localStorage.setItem(
      "watchlist",
      JSON.stringify([...watchlist, movieDetails])
    )
    Swal.fire({
      icon: "success",
      title: "Movie Added",
      text: `${movieDetails.title} has been added to your watchlist!`,
      timer: 3000, // Display the alert for 3 seconds
      showConfirmButton: false,
    })
  }
  return (
    <Layout>
      <div className="text-white" key={movieDetails._id}>
        {/* {movieDetails.title}
        {movieDetails.description}
        {movieDetails.director}
        <img
          src={`http://localhost:8080/api/v1/movie/movie-photo/${movieDetails._id}`}
          alt={movieDetails.title}
          width={100}
          height={100}
        /> */}
        <div className="video-container">
          <div className="player-wrapper">
            {/* <AiOutlineArrowLeft
              className="text-white mx-5 pb-3  "
              size={35}
              onClick={() => navigate(-1)}
            /> */}
            {/* <FullScreen> */}
            <ReactPlayer
              url={`http://localhost:8080/api/v1/movie/movie-video/${movieDetails._id}`}
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
            {/* <div className=" z-50 absolute -mt-14 mx-36">
              <button onClick={handleBackward} className="mx-2">
                <BsSkipBackward size={20} />
              </button>
              <button onClick={handleForward}>
                <BsSkipForward size={20} />
              </button>
            </div> */}
            {/* </FullScreen> */}
          </div>
          {/* <div className="custom-controls">
            <button onClick={handlePlay}>Play</button>
            <button onClick={handlePause}>Pause</button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
            /> */}
          {/* <select
              value={selectedQuality || ""}
              onChange={(e) => handleQualityChange(e.target.value)}
            >
              <option value="">Select Quality</option>
              {renderQualityOptions()}
            </select> */}

          {/* {!isFullScreen ? (
              <button onClick={handleFullScreen}>Fullscreen</button>
            ) : (
              <button onClick={handleExitFullScreen}>Exit Fullscreen</button>
            )} */}
          {/* </div> */}
        </div>
        <div className="flex justify-between py-5 ">
          <div className="  ">
            <h1 className="capitalize font-medium sm:text-[18px] lg:text-[28px] mx-10">
              {" "}
              {movieDetails.title}
            </h1>
            <div className="justify-start mx-10">
              <div className="flex mx-0">
                <div className=" text-sm text-gray-500 capitalize">
                  {movieDetails.contenttype &&
                    movieDetails.contenttype.contenttype}
                </div>
                <div className="flex text-sm text-gray-500">
                  <span className="align-items-center my-1 mx-1">
                    {/* <BiTimeFive /> */}
                    <span className="mx-0 align-items-center justify-center flex text-sm text-gray-500">
                      &#x2022;{" "}
                    </span>
                  </span>
                  {movieDetails.category && movieDetails.category.name}
                </div>
              </div>
            </div>
          </div>

          <div className="flex mx-10 text-sm  py-5 justify-evenly">
            {/* <div className="mx-3">Like</div> */}
            <div className="mx-3" onClick={() => handleShare(movieDetails)}>
              <div className="flex justify-center align-items-center">
                <BsFillShareFill size={20} />
              </div>
              <div className="text-gray-500">Share</div>
            </div>
            <div className="mx-3" onClick={() => handleWatchlist(movieDetails)}>
              <div className=" flex justify-center align-items-center">
                <AiOutlinePlusCircle size={20} />
              </div>
              <div className="text-gray-500">Watch List</div>
            </div>
          </div>
        </div>
        <hr className=" opacity-10" />
        <div className="mx-10">
          {/* <p className="font-medium sm:text-[12px] lg:text-[18px]">
            <span className="text-[#666666]">Content Type:</span>
            <span className="mx-2 capitalize">
              {movieDetails.contenttype && movieDetails.contenttype.contenttype}
            </span>
          </p> */}
          {/* <p className="font-medium sm:text-[12px] lg:text-[18px]">
            <span className="text-[#666666]">Genre:</span>
            <span className="mx-2">
              {movieDetails.category && movieDetails.category.name}
            </span>
          </p> */}

          <div className="my-4 ">
            <h1 className="text-[24px] text-[#666] font-bold">
              About the movie
            </h1>
            <p className="mx-2">
              {" "}
              {truncate(`${movieDetails?.description}`, 320)}
            </p>
            <p className="font-medium sm:text-[12px] my-3 lg:text-[18px]">
              <span className="text-[#666666]">Director:</span>
              <span className="mx-2  capitalize">{movieDetails.director}</span>
            </p>
          </div>
        </div>

        {/* <h1 className="font-semibold text-[28px] my-10 mx-10">
          Movies You May Like
        </h1> */}
        {/* <div className="flex mx-10">
          {filteredmovie.map((c) => (
            <div className=" bg-white rounded p-5 mx-5 w-96">
              <HoverVideoPlayer
                videoSrc={`http://localhost:8080/api/v1/movie/movie-video/${c._id}`}
                controls
                className=""
                pausedOverlay={
                  <img
                    src={`http://localhost:8080/api/v1/movie/movie-photo/${c._id}`}
                    alt={c.title}
                    style={{
                      // Make the image expand to cover the video's dimensions
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                }
                loadingOverlay={
                  <div className="loading-overlay">
                    <div className="loading-spinner" />
                  </div>
                }
              />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{c.title}</p>
              </h5>
              <div className="font-normal text-gray-700 dark:text-gray-400">
                <h1>{c.category.name}</h1>
              </div>
              <div className="flex justify-between align-items-center flex-auto">
                <div className=" ">
                  <Button
                    className={styles.button}
                    onClick={() => handleMovieDetails(c)}
                    type="submit"
                  >
                    watch now
                  </Button>
                </div>
                <div className="my-5 hover:text-[#f5a509] hover:font-semibold">
                  <button
                    className="hover:text-[#f5a509]"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      display: "flex",
                    }}
                  >
                    <BiShare
                      // className={styles.button}
                      //   onClick={handleLogin}
                      width={300}
                      height={300}
                      className=" hover:text-[#f5a509]  "
                      style={{ color: "#000" }}
                      type="submit"
                    />
                    share
                  </button>
                </div>
                <div className="  text-gray-600 dark:text-gray-300 text-sm">
                  <Dropdown
                    triggerelement={
                      <Button
                        className="text-gray-700 hover:text-gray-900"
                        iconRight={BiShare}
                      >
                        Share
                      </Button>
                    }
                  >
                    <Dropdown.Item>
                      <BiShare
                        className="mr-1"
                        onClick={() => handleShare(c)}
                      />
                      <FacebookShareButton
                        url={`${"http://localhost:8080/get-movie/:slug"}/movie/${
                          c.title
                        }`}
                        quote={c.title}
                        className="Demo__some-network__share-button"
                      >
                        <FacebookIcon size={24} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={`${window.location.origin}/movie/${c.title}`}
                        title={c.title}
                        className="Demo__some-network__share-button"
                      >
                        <TwitterIcon size={24} round />
                      </TwitterShareButton>
                      <WhatsappShareButton
                        url={`${window.location.origin}/movie/${c.title}`}
                        title={c.title}
                        separator=":: "
                        className="Demo__some-network__share-button"
                      >
                        <WhatsappIcon size={24} round />
                      </WhatsappShareButton>
                    </Dropdown.Item>
                    {/* <Dropdown.Item>Settings</Dropdown.Item>
                      <Dropdown.Item>Earnings</Dropdown.Item>
                      <Dropdown.Item>Sign out</Dropdown.Item> */}
        {/* </Dropdown>
                  <div className="flex items-center">
                    <BiShare className="mr-1" onClick={() => handleShare(c)} />
                    <FacebookShareButton
                      url={`${window.location.origin}/movie/${c._id}`}
                      quote={c.title}
                      className="Demo__some-network__share-button"
                    >
                      <FacebookIcon size={24} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`${window.location.origin}/movie/${c._id}`}
                      title={c.title}
                      className="Demo__some-network__share-button"
                    >
                      <TwitterIcon size={24} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={`${window.location.origin}/movie/${c._id}`}
                      title={c.title}
                      separator=":: "
                      className="Demo__some-network__share-button"
                    >
                      <WhatsappIcon size={24} round />
                    </WhatsappShareButton>
                  </div>
                </div> */}
        {/* </div>
            </div>
          ))} */}
        {/* </div> */}
      </div>
    </Layout>
  )
}

export default MovieDetails
