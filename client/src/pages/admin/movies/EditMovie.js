import React, { useEffect, useState } from "react"
import Layout from "../../../components/layout/Layout"
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react"
import Sidebar from "../../../components/layout/Sidebar"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const getGenres = "http://localhost:8080/api/v1/category/get-category"
const getContenttype =
  "http://localhost:8080/api/v1/content-type/get-contenttype"

function EditMovie() {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  const [value, setValue] = useState("")
  const maxLength = 200
  const handletext = (event) => {
    const newValue = event.target.value
    setValue(newValue)
  }

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [contenttypes, setContentTypes] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [director, setDirector] = useState("")
  const [category, setCategory] = useState("")
  const [contenttype, setContenttype] = useState("")
  // const [quantity, setQuantity] = useState("")
  // const [shipping, setShipping] = useState("")
  const [poster, setPoster] = useState("")
  const [video, setVideo] = useState("")

  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("")
  const [id, setId] = useState("")
  // const [contenttypeselectedOption, setContentTypeSelectedOption] = useState("")
  // const [genreselectedOption, setgenreSelectedOption] = useState("")

  const getAllCategories = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(getGenres)
      if (data.success) {
        console.log(data.category)
        setCategories(data.category)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error, "something went wrong getting all genres")
    }
  }

  const getAllContentType = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(getContenttype)
      if (data.success) {
        console.log(data.contenttype)
        setContentTypes(data.contenttype)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error, "something went wrong getting all genres")
    }
  }

  // const handleGenreChange = (event) => {
  //   setgenreSelectedOption(event.target.value)
  // }
  // const handleContentTypeChange = (event) => {
  //   setContentTypeSelectedOption(event.target.value)
  // }
  // const handleChange = (event) => {
  // setSelectedOption(event.target.value)
  // }

  const getSingleMovie = async () => {
    try {
      if (location.state) {
        // Check if location state contains the genre data
        const Data = location.state
        console.log(Data)
        setTitle(Data.title)
        setDirector(Data.director)
        setDescription(Data.description)
        setCategory(Data.category._id)
        setPoster(Data.poster)
        setContenttype(Data.contenttype._id)
        setId(Data._id)

        // setGenreName(genreData.name)
      } else {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/movie/get-movie/${params.slug}`
        )
        console.log("data", data.data)
        setTitle(data.data.title)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getAllCategories()
    getAllContentType()
    getSingleMovie()
  }, [])
  const handleVideoUpload = (file) => {
    setSelectedVideo(file)
    setVideoPreviewUrl(file ? URL.createObjectURL(file) : "")
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("title", title)
      productData.append("description", description)
      productData.append("director", director)
      // productData.append("quantity", quantity)
      if (poster) {
        productData.append("poster", poster)
      }
      if (video) {
        productData.append("video", video)
      }
      productData.append("category", category)
      productData.append("contenttype", contenttype)
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/movie/update-movie/${id}`,
        productData
      )
      if (data?.success) {
        alert(data?.message)
        navigate("/dashboard/admin/movies")
      } else {
        alert("Product Created Successfully")
      }
    } catch (error) {
      console.log(error)
      alert("something went wrong")
    }
  }
  const posterUrl = poster ? URL.createObjectURL(poster) : null
  const videoUrl = video ? URL.createObjectURL(video) : null
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
            <Card className="bg-gray-900">
              <div className="flex justify-between">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Movies
                </h5>
                <span className="">
                  <Button color="warning" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </span>
              </div>
              <form
                className="flex flex-col gap-4"
                encType="multipart/form-data"
              >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="movietitle" value="Movie Title" />
                  </div>
                  <TextInput
                    id="movietitle"
                    type="text"
                    name="title"
                    placeholder=""
                    required={true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="director" value="Director" />
                  </div>
                  <TextInput
                    id="director"
                    type="text"
                    name="director"
                    placeholder=""
                    required={true}
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="moviebreif" value=" Movie Breif" />
                  </div>
                  <Textarea
                    value={description}
                    maxLength={maxLength}
                    onChange={(e) => setDescription(e.target.value)}
                    className=" text-black input"
                    rows={4}
                    placeholder="write your query"
                    style={{
                      border: "1px solid rgb(234, 82, 118)",
                    }}
                  />
                  <br />
                  <p className="text-red-800">
                    Characters remaining:{" "}
                    <span className="text-red-800 fw-bold">
                      {maxLength - value.length}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap justify-between  ">
                  <div className="w-1/3">
                    <div className="mb-2 block  ">
                      <Label htmlFor="moviebreif" value=" Content Type" />
                    </div>
                    {/* <TextInput
                    id="moviebreif"
                    type="text"
                    name="moviebreif"
                    required={true}
                  /> */}
                    <select
                      // value={contenttypeselectedOption}
                      className="text-black rounded"
                      onChange={(e) => {
                        setContenttype(e.target.value)
                      }}
                      value={contenttype}
                    >
                      <option value="" className="text-muted">
                        Select Content type
                      </option>
                      {contenttypes?.map((contenttype) => (
                        <option
                          key={contenttype._id}
                          className="text-black"
                          value={contenttype._id}
                        >
                          {contenttype.contenttype}
                        </option>
                      ))}
                    </select>
                    {/* <p>Selected option: {selectedOption}</p> */}
                  </div>
                  <div className="sm:w-1/3">
                    <div className="mb-2   block">
                      <Label htmlFor="moviebreif" value=" Movie Genre" />
                    </div>
                    <select
                      className="text-black rounded"
                      onChange={(e) => {
                        setCategory(e.target.value)
                      }}
                      value={category}
                    >
                      <option value="" className="text-muted">
                        Select Genre
                      </option>
                      {categories?.map((c) => (
                        <option
                          key={c._id}
                          className="text-black"
                          value={c._id}
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {/* <p>Selected option: {selectedOption}</p> */}
                  </div>

                  <div className="sm:w-1/3">
                    <div className="mb-2   block">
                      <Label htmlFor="moviebreif" value="Content Advisory" />
                    </div>
                    {/* <select
                    value={selectedOption}
                    className="text-black rounded"
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="option1" className="text-black">
                      Romantic
                    </option>
                    <option value="option2" className="text-black">
                      Drama
                    </option>
                    <option value="option3" className="text-black">
                      fictional
                    </option>
                  </select> */}
                    {/* <p>Selected option: {selectedOption}</p> */}
                  </div>
                </div>
                <div className="flex flex-wrap justify-between ">
                  <div className="sm:w-1/4 ">
                    <button
                      // htmlFor="movietitle"
                      value="poster upload"
                      className="text-black"
                      type="button"
                    >
                      <span className="text-black">
                        {poster ? poster.title : "upload poster"}
                      </span>
                      <input
                        // id="movieupload"
                        type="file"
                        name="poster"
                        accept="image/*"
                        // placeholder=""
                        // required={true}
                        onChange={(e) => setPoster(e.target.files[0])}
                        // hidden
                      />
                    </button>
                    {posterUrl && (
                      <div className="text-center">
                        <img src={posterUrl} alt="" height={100} />
                      </div>
                    )}

                    {/* <div className="text-center">
                        <img
                          src={`http://localhost:8080/api/v1/movie/movie-photo/${id}`}
                          alt=""
                          height={100}
                        />
                      </div> */}
                  </div>
                  <div className="sm:w-1/4">
                    <div className="mb-2 block">
                      <Label htmlFor="videoupload" value="Video upload" />
                    </div>
                    <input
                      id="videoupload"
                      type="file"
                      name="videoupload"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e.target.files[0])}
                      required={true}
                    />
                  </div>

                  {videoUrl && (
                    <div className="mt-4">
                      <h6>Selected Video Preview:</h6>
                      <video src={videoUrl} controls width="300" />
                    </div>
                  )}
                  {/* <div className="sm:w-1/4 ">
                  <div className="mb-2 block">
                    <Label htmlFor="movietitle" value="Teaser upload" />
                  </div>
                  <TextInput
                    id="movieupload"
                    type="file"
                    name="movieupload"
                    placeholder=""
                    required={true}
                  />
                </div> */}
                  {/* <div className="sm:w-1/4 ">
                  <div className="mb-2 block">
                    <Label htmlFor="movietitle" value="Trailer upload" />
                  </div>
                  <TextInput
                    id="movieupload"
                    type="file"
                    name="movieupload"
                    placeholder=""
                    required={true}
                  />
                </div> */}
                  {/* <div className="sm:w-1/5 ">
                  <div className="mb-2 block">
                    <Label htmlFor="movietitle" value="Poster upload" />
                  </div>
                  <TextInput
                    id="movieupload"
                    type="file"
                    name="movieupload"
                    placeholder=""
                    required={true}
                  />
                </div> */}
                </div>

                <Button color="warning" type="submit" onClick={handleUpdate}>
                  Submit
                </Button>
              </form>
              <p className="font-normal text-gray-700 dark:text-gray-400"></p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EditMovie
