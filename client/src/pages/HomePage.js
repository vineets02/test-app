import React, { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import { useAuth } from "../context/auth"
import axios from "axios"
import HoverVideoPlayer from "react-hover-video-player"
// import { Card, Carousel } from "flowbite-react"
import Button from "../components/Button"
import styles from "../pages/auth/Login.module.css"
import { BiShare } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"
import { Dropdown } from "flowbite-react"
import Banner from "../components/Banner"
import Row from "../components/Row"
import MovieCard from "../components/MovieCard"
import NewCard from "../components/NewCard"

function Loader() {
  return (
    <div className="loader">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  )
}

function HomePage() {
  const [auth, setAuth] = useAuth()
  const [movies, setMovies] = useState([])
  const [genre, setGenre] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  //get All Movies
  // const handleMovieDetails = (movie) => {
  //   navigate(`/dashboard/admin/movie/${movie._id}`, {
  //     state: movie,
  //   })
  // }
  const getAllMovies = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/movie/get-movie"
      )
      setMovies(data.movies)
      setLoading(false)
      console.log(setMovies)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    getAllMovies()
    console.log("insideuser")
  }, [])

  window.addEventListener("beforeunload", (event) => {
    getAllMovies()
    console.log("API call before page reload")
  })

  window.addEventListener("unload", (event) => {
    getAllMovies()
    console.log("API call after page reload")
  })

  const handleShare = (movie) => {
    const shareUrl = `${window.location.origin}/movie/${movie.title}`
    const title = movie.title

    // Open share dialog
    navigator
      .share({
        title: title,
        url: shareUrl,
      })
      .then(() => {
        console.log("Shared successfully")
      })
      .catch((error) => {
        console.log("Error sharing:", error)
      })
  }

  return (
    <Layout title={"TMP - Watch Movies & Web Series"}>
      {/* {movies.map((c) => ( */}
      {/* <Carousel> */}
      {/* <div
            key={c._id}
            className="carousel-item "
            style={{ display: "inline-block" }}
          > */}
      {/* <HoverVideoPlayer
            videoSrc={`http://localhost:8080/api/v1/movie/movie-video/${c._id}`}
            controls
            className="absolute  w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
            // style={{ height: "50vh" }}
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
          /> */}
      {/* </div> */}
      {/* </Carousel>
      ))} */}
      {/* <img src="/docs/images/carousel/carousel-1.svg"  alt="..."> */}

      {/* </div> */}

      {/* <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-2.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-3.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
       
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-4.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-5.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div> */}
      {/* </div>

        <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
          <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
          <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 2"
            data-carousel-slide-to="1"
          ></button>
          <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 3"
            data-carousel-slide-to="2"
          ></button>
          <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 4"
            data-carousel-slide-to="3"
          ></button>
          <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 5"
            data-carousel-slide-to="4"
          ></button>
        </div>

        <button
          type="button"
          class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div> */}

      {/* <div key={c._id} style={{ height: "80vh" }}>
          <Carousel
            className="  "
            style={{ height: "80vh" }}
            key={c._id}
            showStatus={false}
            showIndicators={true}
            showThumbs={false}
            infiniteLoop={true}
          >
           
          </Carousel>
        </div> */}
      {/* <div className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 "> */}
      {/* <Banner /> */}
      {/* </div> */}
      {/* <Row title="trending" /> */}
      {/*  */}
      {loading ? (
        <Loader /> // Render the loader component when loading is true
      ) : (
        <div className=" mx-10">
          <div className="  ">
            {/* <h1>All Movies</h1> */}
            <div className="  my-20 items-center  md:p-2">
              {/* <h1>movie</h1> */}
              <h4 className="text-2xl font-medium my-16">Streming Now</h4>

              <div className=" md:container md:mx-auto text-center grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 md:grid-cols-2  items-center space-x-1.5 mx-2 md:space-x-3.5 md:p-2">
                {movies.map((movie, index) => (
                  <NewCard movie={movie} key={index} />
                ))}
              </div>
              {/* {movies.map((movie,index) => ( */}
              {/* <div
                className={`hover:opacity-100   mx-2 w-56 relative h-80 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
              >
                <HoverVideoPlayer
                  videoSrc={`http://localhost:8080/api/v1/movie/movie-video/${c._id}`}
                  controls
                  className="m-2"
                  pausedOverlay={
                    <img
                      src={`http://localhost:8080/api/v1/movie/movie-photo/${c._id}`}
                      alt={c.title}
                      className="rounded-sm object-cover md:rounded "
                      style={{
                        // Make the image expand to cover the video's dimensions
                        width: "100%",
                        height: "100%",
                        objectFit: "fit",
                      }}
                    />
                  }
                  loadingOverlay={
                    <div className="loading-overlay">
                      <div className="loading-spinner" />
                    </div>
                  }
                />

                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-white mb-100">
                  <p>{c.title}</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <p>{c.category.name}</p>
                </p>
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
                      triggerElement={
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
              {/* </Dropdown> */}
              {/* <div className="flex items-center"> */}
              {/* <BiShare
                        className="mr-1"
                        onClick={() => handleShare(c)}
                      />
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
                      </WhatsappShareButton> */}
              {/* </div> */}
              {/* </div> */}
              {/* </div> */}
              {/* </div> */}

              {/* <MovieCard key={movie.} movie={movie} /> */}

              {/* ))} */}

              {/* <HoverVideoPlayer
              videoSrc={`http://localhost:8080/api/v1/movie/movie-video/${c._id}`}
              // controls
              className="m-2"
              pausedOverlay={
                <img
                  src={`http://localhost:8080/api/v1/movie/movie-photo/${c._id}`}
                  alt=""
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
            /> */}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default HomePage
