import React, { useState } from "react"
import Layout from "../../components/layout/Layout"
import Button from "../../components/Button"
import { Link, useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import axios from "axios"
import toast from "react-hot-toast"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import { signUpSchema } from "../../schema"

const initialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  question: "",
}

function Signup() {
  // const [apiResponse, setApiResponse] = useState("")
  const navigate = useNavigate()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(api, {
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phone,
            question: values.question,
          })

          localStorage.setItem("user", JSON.stringify(response.data))
          if (response.data.success) {
            alert(response.data.message)
            navigate("/login")
          } else {
            toast.error(response.data.message)
          }
        } catch (err) {
          console.log(err)
        }
      },
    })

  const api = "http://localhost:8080/api/v1/auth/register"

  // const handleSignupSubmit = async (e) => {
  //   e.preventDefault()
  // }

  return (
    <Layout title={"TMP - signup"}>
      {/* <ToastContainer /> */}
      <div className={styles.background}>
        <img
          src="../background.png"
          className={styles.bgimg}
          // layout="fill"
          // objectFit="cover"
          style={
            {
              // height: "auto",
              // width: "100%",
              // backgroundPosition: "center",
              // backgroundSize:" ",
              // backgroundRepeat: "no-repeat",
              // width: "100vw",
              // height: "100vh",
            }
          }
          alt=""
        />
        <div className={styles.container}>
          <h1>Sign Up</h1>
          {/* {!email ? ( */}
          {/* <div>
            <Button
              className={styles.button}
              // onClick={() => alert("thanks for signup")}
              type="submit"
              onClick={handleStart}
            >
              get started
            </Button>
          </div> */}
          {/* ) : ( */}
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                // styles={styles.Input}
                placeholder="Username"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
                onBlur={handleBlur}
                className="text-sm w-full px-4  text-black py-2 border border-solid border-gray-300 rounded"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                // errorMessage="Please enter your username"
                // ref={usernameRef}
              />
              {errors.name && touched.name ? (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <input
                styles={styles.Input}
                className="text-sm w-full px-4 text-black py-2 border border-solid border-gray-300 rounded"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
                onBlur={handleBlur}

                // errorMessage="Please enter your email"
                // ref={emailRef}
              />
              {errors.email && touched.email ? (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <input
                styles={styles.Input}
                className="text-sm w-full px-4 text-black py-2 border border-solid border-gray-300 rounded"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                required
                onBlur={handleBlur}

                // errorMessage="Please enter your password"
                // ref={passwordRef}
              />
              {errors.password && touched.password ? (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <input
                styles={styles.Input}
                className="text-sm w-full px-4 text-black py-2 border border-solid border-gray-300 rounded"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Phone Number"
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                required
                onBlur={handleBlur}

                // errorMessage="Please enter your password"
                // ref={passwordRef}
              />
              {errors.phone && touched.phone ? (
                <p className="text-red-500 text-xs italic">{errors.phone}</p>
              ) : null}
            </div>
            <div className="mb-6">
              <div className="my-2">
                <label className="">Which is your favourite movie?</label>
              </div>
              <input
                styles={styles.Input}
                className="text-sm w-full px-4 text-black py-2 border border-solid border-gray-300 rounded"
                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder=""
                type="text"
                name="question"
                value={values.question}
                onChange={handleChange}
                required
                onBlur={handleBlur}

                // errorMessage="Please enter your password"
                // ref={passwordRef}
              />
              {errors.question && touched.question ? (
                <p className="text-red-500 text-xs italic">{errors.question}</p>
              ) : null}
            </div>
            <Button
              className={styles.button}
              // onClick={handleFinish}
              type="submit"
              // onClick={handleFinish}
            >
              Sign Up
            </Button>
            {/* <p className="alert">{status}</p> */}
          </form>
          {/* )} */}
          {/* <div>
      <Checkbox className={styles.checkbox} label="Remember me" />
      {/* <span>Remember me </span> */}
          {/* </div> */}
          <div className=" flex" style={{ display: "flex", marginTop: 10 }}>
            <span
              className="sm:text-[12px] text-center"
              style={{ paddingRight: 10 }}
            >
              Already have an account{" "}
            </span>
            <Link to="/login">
              <span>Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup
