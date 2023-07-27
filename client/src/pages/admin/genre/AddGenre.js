import React from "react"
import Layout from "../../../components/layout/Layout"
import Sidebar from "../../../components/layout/Sidebar"
import { Button, Card, Label, TextInput } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { GenreSchema } from "../../../schema"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const initialValues = {
  name: "",
}

function AddGenre() {
  const navigate = useNavigate()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: GenreSchema,
      onSubmit: async (values) => {
        console.log("values", values)
        try {
          const { data } = await axios.post(api, {
            name: values.name,
          })
          if (data?.success) {
            alert(data.message)
            // toast.success(data.message, {
            //   position: "top-right",
            //   autoClose: 3000, // Time in milliseconds to close the toast automatically
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            // })
            navigate("/dashboard/admin/genre")
          } else {
            alert(data.message)
          }
        } catch (err) {
          console.log(err)
        }
      },
    })
  const api = "http://localhost:8080/api/v1/category/create-category"
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
            <div className="bg-[#1C1C1C] py-4 px-5 rounded">
              <div className="flex justify-between">
                <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white">
                  Add Genre
                </h5>
                <span className="">
                  <Button color="warning" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </span>
              </div>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <div className="mb-2 block ">
                    <Label
                      htmlFor="movietitle"
                      className="text-white"
                      value="Genre"
                    />
                  </div>
                  <TextInput
                    id="movietitle"
                    type="text"
                    name="name"
                    placeholder=""
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                  />
                </div>
                {errors.name && touched.name ? (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                ) : null}
                <Button color="warning" type="submit">
                  Submit
                </Button>
              </form>
              <p className="font-normal text-gray-700 dark:text-gray-400"></p>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddGenre
