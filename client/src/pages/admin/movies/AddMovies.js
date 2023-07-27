import React, { useEffect, useState } from "react"
import Layout from "../../../components/layout/Layout"
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../../components/layout/Sidebar"
import axios from "axios"
import Swal from "sweetalert2"

const getGenres = "http://localhost:8080/api/v1/category/get-category"
const getContenttype =
  "http://localhost:8080/api/v1/content-type/get-contenttype"
function AddMovies() {
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  // const maxLength = 200,
  // const handletext = (event) => {
  //   const newValue = event.target.value
  //   setValue(newValue)
  // }

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [contenttypes, setContentTypes] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [director, setDirector] = useState("")
  const [duration, setDuration] = useState("")
  const [language, setLanguage] = useState("")
  const [trailer, setTrailer] = useState("")
  const [category, setCategory] = useState("")
  const [contenttype, setContenttype] = useState("")

  const [poster, setPoster] = useState("")
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("")
  console.log(poster, 12)
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
  useEffect(() => {
    getAllCategories()
    getAllContentType()
  }, [])

  const handleVideoUpload = (file) => {
    setSelectedVideo(file)
    setVideoPreviewUrl(URL.createObjectURL(file))
  }

  const handleTrailerUpload = (file) => {
    setTrailer(file)
    // setVideoPreviewUrl(URL.createObjectURL(file))
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      if (!poster || !selectedVideo) {
        Swal.fire({
          icon: "error",
          text: "Please select a poster and video",
        })
        return
      }
      const productData = new FormData()
      productData.append("title", title)
      productData.append("description", description)
      productData.append("director", director)
      productData.append("duration", duration)
      productData.append("language", language)
      productData.append("trailer", trailer)
      productData.append("poster", poster)
      productData.append("video", selectedVideo)
      productData.append("category", category)
      productData.append("contenttype", contenttype)

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/movie/create-movie",
        productData
      )

      if (data?.success) {
        Swal.fire({
          icon: "success",
          text: data?.message,
        }).then(() => {
          navigate("/dashboard/admin/movies")
        })
      } else {
        Swal.fire({
          icon: "error",
          text: "Product Created Successfully",
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something went wrong",
        error,
      })
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
                    <Label htmlFor="title" value="Movie Title" />
                  </div>
                  <TextInput
                    id="name"
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
                    // maxLength={maxLength}
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
                      {/* {maxLength - value.length} */}
                    </span>
                  </p>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="duration" value="Duration" />
                  </div>
                  <TextInput
                    id="duration"
                    type="text"
                    name="duration"
                    placeholder=""
                    required={true}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="language" value="Language" />
                  </div>
                  <TextInput
                    id="language"
                    type="text"
                    name="language"
                    placeholder=""
                    required={true}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>
                {/* <div>
                  <div className="mb-2 block">
                    <Label htmlFor="trailer" value="Trailer" />
                  </div>
                  <TextInput
                    id="trailer"
                    type="text"
                    name="trailer"
                    placeholder=""
                    required={true}
                    value={trailer}
                    onChange={(e) => setTrailer(e.target.value)}
                  />
                </div> */}

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
                      // value={genreselectedOption}
                      className="text-black rounded"
                      onChange={(e) => {
                        setCategory(e.target.value)
                      }}
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
                    {/* {poster && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(poster)}
                          alt=""
                          height={100}
                        />
                      </div>
                    )} */}
                  </div>
                  <div className="sm:w-1/4">
                    <div className="mb-2 block">
                      <Label htmlFor="videoupload" value="Video upload" />
                    </div>
                    <input
                      id="videoupload"
                      type="file"
                      name="selectedVideo"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e.target.files[0])}
                      required={true}
                    />
                  </div>

                  {selectedVideo && (
                    <div className="mt-4">
                      <h6>Selected Video Preview:</h6>
                      <video src={videoPreviewUrl} controls width="300" />
                    </div>
                  )}

                  <div className="sm:w-1/4">
                    <div className="mb-2 block">
                      <Label htmlFor="videoupload" value="Trailer upload" />
                    </div>
                    <input
                      id="videoupload"
                      type="file"
                      name="trailer"
                      accept="video/*"
                      onChange={(e) => handleTrailerUpload(e.target.files[0])}
                      required={true}
                    />
                  </div>

                  {/* {trailer && (
                    <div className="mt-4">
                      <h6>Selected Video Preview:</h6>
                      <video src={videoPreviewUrl} controls width="300" />
                    </div>
                  )} */}
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

                <Button color="warning" type="submit" onClick={handleCreate}>
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

export default AddMovies
