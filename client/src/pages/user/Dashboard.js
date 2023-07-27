import React, { useState } from "react"
import Layout from "../../components/layout/Layout"
import styles from "./UserDashboard.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth"
import axios from "axios"

function Dashboard() {
  const [auth] = useAuth()
  const [subscriptionStatus, setSubscriptionStatus] = useState(
    auth.user.subscription || false
  )

  console.log(auth.user._id)
  // const navigate = useNavigate()
  // const [isSubscribed, setIsSubscribed] = useState(false) // State to track subscription status

  // const handlePayment = () => {
  // Process payment logic here
  // Once the payment is successful, update the subscription status
  // setIsSubscribed(true)
  // }
  const handleSubscriptionToggle = async () => {
    try {
      const response = await axios.put(
        `https://tmp-h86h.onrender.com/api/v1/auth/${auth.user._id}/subscription`
      )
      const { success, message } = response.data

      if (success) {
        setSubscriptionStatus(!subscriptionStatus)
        console.log(message)
      } else {
        console.error(message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  console.log(handleSubscriptionToggle())

  return (
    <Layout title={"User Dashboard"}>
      <div className={styles.profileScreen_body}>
        <h1>Edit Profile</h1>
        <div className={styles.profileScreen_info}>
          <img src="/netflix_icon.jpg" alt="" />
          <div className={styles.profileScreen_details}>
            <h2>{auth.user.email}</h2>
            <div className={styles.profileScreen_plans}>
              <h3 className="text-white">
                Subscription Status:{" "}
                {subscriptionStatus ? "Active" : "Inactive"}
              </h3>
              {/* {!isSubscribed ? ( */}
              <button onClick={handleSubscriptionToggle}>
                {subscriptionStatus
                  ? "Deactivate Subscription"
                  : "Activate Subscription"}
              </button>
              <Link to="https://buy.stripe.com/test_8wMbJt4nQeFO9osbII">
                Subscribe
              </Link>
              {/* ) : ( */}
              <p>Already Subscribed</p>
              <p className="text-white"> {auth.user.subscription}</p>

              {/* )} */}
              <button className={styles.profileScreen_signout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
