import React, { useEffect, useState } from "react"
import Layout from "../../../components/layout/Layout"
import Sidebar from "../../../components/layout/Sidebar"
import { Button, Card, Label, TextInput } from "flowbite-react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"

function EditGenre() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const location = useLocation()
  const params = useParams()

  const [genreName, setGenreName] = useState("")

  const fetchGenreData = async () => {
    try {
      if (location.state) {
        // Check if location state contains the genre data
        const genreData = location.state
        console.log(genreData.name)

        setGenreName(genreData.name)
      } else {
        // Fetch the genre data from the API
        const response = await axios.get(
          `http://localhost:8080/api/v1/category/single-category/${slug}`
        )
        const genreData = response.data
        console.log(genreData.name)
        setGenreName(genreData.name)
        console.log(genreData)
      }
    } catch (error) {
      console.log(error, "something went wrong getting the genre data")
    }
  }

  useEffect(() => {
    fetchGenreData()
  }, [])

  const handleUpdateGenre = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${params.slug}`,
        { name: genreName }
      )
      if (data.success) {
        alert(`${genreName} is updated`)
        // setSelected(null);
        setGenreName("")
        // setVisible(false);
        // getAllCategory();
        navigate(-1) // Navigate back to the previous page
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error, "something went wrong updating the genre")
    }
  }

  return (
    <Layout className="text-3xl">
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
            <div className="bg-[#1C1C1C] py-4 px-5 rounded ">
              <div className="flex justify-between">
                <h5 className="text-2xl font-bold tracking-tight text-white  dark:text-white">
                  Edit Genre
                </h5>
                <span className="">
                  <Button color="warning" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </span>
              </div>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleUpdateGenre}
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="movietitle" value="Movie Title" />
                  </div>
                  <TextInput
                    id="movietitle"
                    type="text"
                    name="movietitle"
                    placeholder=""
                    value={genreName}
                    onChange={(e) => setGenreName(e.target.value)}
                    required={true}
                    style={{ backgroundColor: "gray" }}
                  />
                </div>

                <Button color="warning" type="submit">
                  Submit
                </Button>
              </form>
              <p className="font-normal text-gray-700 dark:text-gray-400"></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EditGenre
