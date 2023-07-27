import React, { useState } from "react"
import Layout from "../../components/layout/Layout"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Button from "../../components/Button"
import styles from "./Login.module.css"
import axios from "axios"
import { useAuth } from "../../context/auth"

// import background from "../../../public/assets/background.png"
// import image from "../../../assets/background.png"

const api = "http://localhost:8080/api/v1/auth/login"

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [auth, setAuth] = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(api, {
        // username,
        email,
        password,
      })
      if (response.data.success) {
        // If login is successful, set loginSuccess state to true
        setLoginSuccess(true)
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        })
        localStorage.setItem("user", JSON.stringify(response.data))
        navigate(location.state || "/")
      } else {
        // If login is not successful, reset loginSuccess state to false
        setLoginSuccess(false)
        setLoginError(response.data.message)
      }
    } catch (err) {
      console.log(err)
      setLoginError("An error occurred during login.")
    }
    // login({ email, password }, dispatch)
    // console.log(email, password)
  }
  return (
    <Layout title={"TMP - login"}>
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
          <h1>Log In</h1>
          {loginSuccess ? (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">{loginSuccess}</span>{" "}
              {/* Display the success message */}
            </div>
          ) : loginError ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{loginError}</span>{" "}
              {/* Display the error message */}
            </div>
          ) : null}
          <form className="form" onSubmit={handleLogin}>
            <input
              className={styles.Input}
              placeholder="Email or Phone Number"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              // errorMessage="Please enter your email"
            />
            <input
              className={styles.Input}
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              // errorMessage="Please enter your password"
            />
            <Link
              // className={styles.button}
              //   onClick={handleLogin}
              to="/forgot-password"
              onClick={() => {
                navigate("/forgot-password")
              }}
            >
              forgot password
            </Link>
            <Button
              className={styles.button}
              //   onClick={handleLogin}
              type="submit"
            >
              Log In
            </Button>
            {/* <p className="alert">{status}</p> */}
          </form>
          <div>
            {/* <Checkbox className={styles.checkbox} label="Remember me" /> */}
            {/* <span>Remember me </span> */}
          </div>
          <div className="" style={{ display: "flex" }}>
            <span style={{ paddingRight: 10 }}>New user</span>
            <Link to="/signup">
              <h4>Sign Up</h4>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
