import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import { Button, Card, Table } from "flowbite-react"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../../context/auth"
import Sidebar from "../../components/layout/Sidebar"
import axios from "axios"

const getGenres = "http://localhost:8080/api/v1/content-type/get-contenttype"

function ContentType() {
  // const auth = useAuth()
  const [updateGenre, setUpdateGenre] = useState("")

  const navigate = useNavigate()

  const handleAddMovie = () => {
    navigate("/dashboard/admin/addcontenttype")
  }

  const HandleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/content-type/delete-contenttype/${pId}`
      )
      if (data.success) {
        alert(`content type is deleted`)

        getAllCategory()
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert("Somtihing went wrong")
    }
  }
  const handleEditGenre = (contenttype) => {
    navigate(`/dashboard/admin/edit-contenttype/${contenttype._id}`, {
      state: contenttype,
    })
  }

  //get all the genres
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const getAllCategory = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(getGenres)
      if (data.success) {
        console.log(data)
        setCategories(data.contenttype)

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
          <div className="w-full justify-center mx-10  py-24   ">
            {/* <h1 className="text-white">Create Category</h1> */}
            {/* <div className="card w-100 p-3 text-white">
        <h3 className="text-white"> Admin Name : {auth?.user?.name}</h3>
        <h3> Admin Email : {auth?.user?.email}</h3>
        <h3> Admin Contact : {auth?.user?.phone}</h3>
      </div> */}
            <Card>
              <div className=" justify-evenly">
                <div className="flex justify-between">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Content Type
                  </h5>
                  <span className="">
                    <Button color="warning" onClick={handleAddMovie}>
                      Add content Type
                    </Button>
                  </span>
                </div>
                <div className="font-normal text-gray-700 dark:text-gray-400  justify-end align-items-center ">
                  <table className="justify-align-content-between align-items-center ">
                    <thead className="">
                      <tr>
                        <th>content Type</th>
                        <th> Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={2}>Loading..</td>
                        </tr>
                      ) : (
                        categories?.map((c) => (
                          <tr
                            key={c._id}
                            className="bg-white dark:border-gray-700   dark:bg-gray-800"
                          >
                            <td className="whitespace-nowrap font-medium py-2 text-gray-900 dark:text-white">
                              {c.contenttype}
                            </td>
                            <td className="flex  justify-between py-2">
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
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContentType
