import Layout from "../../components/layout/Layout"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import styles from "./Login.module.css"
import axios from "axios"
import { useAuth } from "../../context/auth"

const api = "http://localhost:8080/api/v1/auth/change-password"
function ChangePassword() {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()

  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(api, {
        email,
        oldPassword,
        newPassword,
      })

      if (response.data.success) {
        alert(response.data.message)
        setAuth({ ...auth, user: null, token: "" })

        localStorage.removeItem("user")
        navigate("/login")
      } else {
        alert(response.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <div className={styles.background}>
        <img
          src="../../background.png"
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
          <h1>Change Password</h1>
          <form className="form" onSubmit={handleLogin}>
            <input
              className={styles.Input}
              placeholder="Email "
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              // errorMessage="Please enter your email"
            />
            <input
              className={styles.Input}
              placeholder="Which is your favourite movie?"
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              // errorMessage="Please enter your password"
            />
            <input
              className={styles.Input}
              placeholder="new Password"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              // errorMessage="Please enter your password"
            />

            <Button
              className={styles.button}
              //   onClick={handleLogin}
              type="submit"
            >
              Reset password
            </Button>
            {/* <p className="alert">{status}</p> */}
          </form>
          {/* <div> */}
          {/* <Checkbox className={styles.checkbox} label="Remember me" /> */}
          {/* <span>Remember me </span> */}
          {/* </div> */}
          {/* <div className="" style={{ display: "flex" }}>
            <span style={{ paddingRight: 10 }}>New user</span>
            <Link to="/signup">
              <h4>Sign Up</h4>
            </Link>
          </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default ChangePassword
