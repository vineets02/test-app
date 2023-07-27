import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import { Table } from "flowbite-react"
import HoverVideoPlayer from "react-hover-video-player"
import axios from "axios"
import { useAuth } from "../../context/auth"
import moment from "moment"

function OrderPage() {
  const [columns, setColumns] = useState([
    "#",
    "order id",
    "status",
    "buyer",
    "order",
    "payment",
    "title",
    "Amount",

    // "Created At",
    // "Updated At",
    // "Action",
  ])
  const [loading, setLoading] = useState(false)
  const [movies, setMovie] = useState([])
  const [auth, setAuth] = useAuth()
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://tmp-h86h.onrender.com/api/v1/auth/orders/"
      )
      console.log("data", data)
      setMovie(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  return (
    <Layout title={"Your Orders"}>
      <div>
        <div>
          <p>{JSON.stringify(movies, null, 4)}</p>
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
                  movies?.map((o, i) => {
                    return (
                      <tr
                        key={o._id}
                        className="bg-white dark:border-gray-700   dark:bg-gray-800"
                      >
                        <td className="whitespace-nowrap font-medium py-2 mx-auto text-gray-900 dark:text-white">
                          {0 + 1}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 mx-auto text-gray-900 dark:text-white">
                          {o._id}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 mx-auto text-gray-900 dark:text-white">
                          {o?.status}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {o?.buyer.name}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {moment(o?.createAt).fromNow()}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {o?.payment.success ? "success" : "failed"}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {o?.movies?.[0].title}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          &#8377; {o?.movies?.[0].price}
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
                          {/* {c.description} */}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {/* {c.contenttype.contenttype} */}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {/* {c.category.name} */}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {/* <img
                            src={`http://localhost:8080/api/v1/movie/movie-photo/${c._id}`}
                            alt={c.title}
                            width={100}
                            height={100}
                          /> */}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {/* <HoverVideoPlayer
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
                          /> */}
                        </td>
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {/* <HoverVideoPlayer
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
                          /> */}
                        </td>
                        {/* {/* <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.createdAt}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                            {c.updatedAt}
                          </td> */}
                        {/* <div className="flex  justify-between py-2 "> */}
                        <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                          {/* <div className="flex justify-between py-2 ">
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
                        </div> */}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OrderPage
