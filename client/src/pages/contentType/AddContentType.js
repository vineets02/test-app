import React from "react"
import Layout from "../../components/layout/Layout"
import Sidebar from "../../components/layout/Sidebar"
import { Button, Card, Label, TextInput } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { GenreSchema } from "../../schema"
import axios from "axios"

const initialValues = {
  contenttype: "",
}

function AddContentType() {
  const navigate = useNavigate()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: GenreSchema,
      onSubmit: async (values) => {
        // console.log(values)
        try {
          const { data } = await axios.post(api, {
            contenttype: values.contenttype,
          })
          if (data?.success) {
            alert(data.message)
            navigate("/dashboard/admin/contenttype")
          } else {
            alert(data.message)
          }
        } catch (err) {
          console.log(err)
        }
      },
    })
  const api = "http://localhost:8080/api/v1/content-type/create-contenttype"
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
                  Add Content Type
                </h5>
                <span className="">
                  <Button color="warning" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </span>
              </div>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="movietitle" value="content type" />
                  </div>
                  <TextInput
                    id="movietitle"
                    type="text"
                    name="contenttype"
                    placeholder=""
                    value={values.contenttype}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                  />
                </div>
                {errors.contenttype && touched.contenttype ? (
                  <p className="text-red-500 text-xs italic">
                    {errors.contenttype}
                  </p>
                ) : null}
                <Button color="warning" type="submit">
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

export default AddContentType
