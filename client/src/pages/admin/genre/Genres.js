import React, { useEffect, useState } from "react"
import Layout from "../../../components/layout/Layout"
import { Button, Card, Table } from "flowbite-react"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../../context/auth"
import Sidebar from "../../../components/layout/Sidebar"
import axios from "axios"

const getGenres = "http://localhost:8080/api/v1/category/get-category"

function Genres() {
  // const auth = useAuth()
  const [updateGenre, setUpdateGenre] = useState("")

  const navigate = useNavigate()

  const handleAddMovie = () => {
    navigate("/dashboard/admin/addgenre")
  }

  const HandleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pId}`
      )
      if (data.success) {
        alert(`category is deleted`)

        getAllCategory()
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("Somtihing went wrong")
    }
  }
  const handleEditGenre = (genre) => {
    navigate(`/dashboard/admin/edit-genre/${genre._id}`, { state: genre })
  }

  //get all the genres
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const getAllCategory = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(getGenres)
      if (data.success) {
        setCategories(data.category)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error, "something went wrong getting all genres")
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    <Layout>
      {" "}
      <div className=" ">
        <div className="flex">
          <div className="w-32 z-50">
            <Sidebar />
          </div>
          <div className="w-full justify-center   py-24   ">
            {/* <h1 className="text-white">Create Category</h1> */}
            {/* <div className="card w-100 p-3 text-white">
        <h3 className="text-white"> Admin Name : {auth?.user?.name}</h3>
        <h3> Admin Email : {auth?.user?.email}</h3>
        <h3> Admin Contact : {auth?.user?.phone}</h3>
      </div> */}
            <div className="bg-[#1C1C1C] py-4 px-5 rounded ">
              <div className=" justify-evenly bg-[#1C1C1C]">
                <div className="flex justify-between ">
                  <h5 className="text-2xl font-bold tracking-tight  text-white dark:text-white">
                    Genre
                  </h5>
                  <span className="">
                    <Button color="warning" onClick={handleAddMovie}>
                      Add Genre
                    </Button>
                  </span>
                </div>
                <div className="font-normal bg-[#1C1C1C] text-gray-700 dark:text-gray-400  justify-end align-items-center ">
                  <table className="min-w-full divide-y bg-[#1C1C1C] divide-gray-200 rounded-lg">
                    <thead className="bg-[#1C1C1C]">
                      {/* <tr> */}
                      <th
                        scope="col"
                        className="px-6 py-3 text-left   text-[#666666]  font-bold uppercase tracking-wider"
                      >
                        Genre name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left  text-[#666666]  font-bold   uppercase tracking-wider"
                      >
                        Action
                      </th>
                      {/* </tr> */}
                    </thead>
                    <tbody className="bg-[#1C1C1C] divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td
                            colSpan={2}
                            className="px-6 py-4 bg-[#1C1C1C] whitespace-nowrap"
                          >
                            Loading..
                          </td>
                        </tr>
                      ) : (
                        categories?.map((c) => (
                          <tr
                            key={c._id}
                            className=" text-[#fff] dark:border-gray-700 bg-[#1C1C1C] dark:bg-gray-800"
                          >
                            <td className="px-6 py-4 bg-[#1C1C1C]  whitespace-nowrap">
                              {c.name}
                            </td>
                            <td className="flex justify-between py-4 bg-[#1C1C1C] ">
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
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Genres
