import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Helmet } from "react-helmet"
import { Toaster } from "react-hot-toast"
import Sidebar from "./Sidebar"

function Layout({ children, title }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Free Web tutorials" />
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <meta name="author" content="John Doe" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <Header />
      <main style={{ minHeight: "20vh" }}>
        {/* <Sidebar /> */}

        <Toaster toastStyle={{ backgroundColor: "#EFA80A" }} />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
