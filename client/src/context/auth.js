import axios from "axios"
import { useState, useEffect, useContext, createContext } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  })

  //default axios

  // Set the token in the default headers whenever it changes in the context
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.token
  }, [auth.token])

  useEffect(() => {
    const data = localStorage.getItem("user")
    if (data) {
      const parseData = JSON.parse(data)
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      })
    }
    //eslint-disable-next-line
  }, [])
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }
