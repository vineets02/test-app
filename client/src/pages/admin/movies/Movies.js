import React, { useEffect, useState } from "react"
import Layout from "../../../components/layout/Layout"
import Sidebar from "../../../components/layout/Sidebar"
import { useAuth } from "../../../context/auth"
import { Alert, Button, Card, Table } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {} from "react-hover-video-player"
import HoverVideoPlayer from "react-hover-video-player"
import Swal from "sweetalert2"
const getMovie = "http://localhost:8080/api/v1/movie/get-movie"

function Movies() {
  const auth = useAuth()

  const navigate = useNavigate()

  const handleAddMovie = () => {
    navigate("/dashboard/admin/addmovie")
  }

  const handleEditGenre = (movie) => {
    navigate(`/dashboard/admin/edit-movie/${movie._id}`, {
      state: movie,
    })
  }
  // const HandleDelete = async (pId) => {
  //   try {
  //     const { data } = await axios.delete(
  //       `http://localhost:8080/api/v1/category/delete-category/${pId}`
  //     )
  //     if (data.success) {
  //       alert(`category is deleted`)

  //       getAllCategory()
  //     } else {
  //       alert(data.message)
  //     }
  //   } catch (error) {
  //     alert("Somtihing went wrong")
  //   }
  // }
  const HandleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this movie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    })

    if (confirmDelete.isConfirmed) {
      try {
        const { data } = await axios.delete(
          `http://localhost:8080/api/v1/movie/delete-movie/${id}`
        )
        if (data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "The movie has been deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          })
          getAllMovies()
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
            confirmButtonText: "Cool",
          })
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonText: "Cool",
        })
      }
    }
  }

  const [loading, setLoading] = useState(false)
  const [movies, setMovie] = useState([])
  const [columns, setColumns] = useState([
    "Title",
    "Director",
    "Slug",
    "Duration",
    "Language",
    "Description",
    "Category",
    "Content Type",
    "Poster",
    "Trailer",
    "video",
    // "Created At",
    // "Updated At",
    "Action",
  ])

  const getAllMovies = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(getMovie)
      if (data.success) {
        console.log(data.movies)
        setMovie(data.movies)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error, "something went wrong getting all genres")
    }
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <Layout title={"TMP - Movies"}>
      <div className=" ">
        <div className="flex">
          <div className="w-32 z-50">
            <Sidebar />
          </div>
          <div className="w-full justify-center mx-10  py-24   ">
            {/* <h1 className="text-white">Create Category</h1> */}
            {/* <div className="card w-100 p-3 text-white">
              <h3 className="text-white"> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
            </div> */}
            <Card>
              <div className="flex justify-between">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Movies
                </h5>
                <span className="">
                  <Button color="warning" onClick={handleAddMovie}>
                    Add Movie
                  </Button>
                </span>
              </div>
              <div className="font-normal text-gray-700 dark:text-gray-400">
                <Table>
                  <Table.Head>
                    {columns.map((column) => (
                      <Table.HeadCell key={column}>{column}</Table.HeadCell>
                    ))}
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={2}>Loading..</td>
                      </tr>
                    ) : (
                      movies?.map((c) => (
                        <tr
                          key={c._id}
                          className="bg-white dark:border-gray-700   dark:bg-gray-800"
                        >
                          <td className="whitespace-nowrap font-medium py-2 mx-auto text-gray-900 dark:text-white">
                            {c.title}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.director}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.slug}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.duration}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.language}
                          </td>
                          <td
                            className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white overflow-hidden"
                            style={{
                              // maxWidth: 500,
                              // maxHeight: 100,
                              overflow: "hidden",
                              whiteSpace: "normal",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {c.description}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.contenttype.contenttype}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.category.name}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            <img
                              src={`http://localhost:8080/api/v1/movie/movie-photo/${c._id}`}
                              alt={c.title}
                              width={100}
                              height={100}
                            />
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            <HoverVideoPlayer
                              videoSrc={`http://localhost:8080/api/v1/movie/movie-trailer/${c._id}`}
                              controls
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
                            />
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            <HoverVideoPlayer
                              videoSrc={`http://localhost:8080/api/v1/movie/movie-video/${c._id}`}
                              controls
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
                            />
                          </td>
                          {/* {/* <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.createdAt}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.updatedAt}
                          </td> */}
                          {/* <div className="flex  justify-between py-2 "> */}
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            <div className="flex justify-between py-2 ">
                              <Button
                                color="warning"
                                onClick={() => handleEditGenre(c)}
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500 mx-2"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => HandleDelete(c?._id)}
                                color="failure"
                                className="font-medium hover:underline dark:text-red-500"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* <Outlet /> */}
      {/* </div> */}
    </Layout>
  )
}

export default Movies
