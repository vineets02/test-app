import React from "react"
import Layout from "../components/layout/Layout"
import { useAuth } from "../context/auth"
import { useWatchlist } from "../context/watch"
import { useNavigate } from "react-router-dom"
import MovieCard from "../components/MovieCard"

function WatchlistPage() {
  const [auth, setAuth] = useAuth()
  const [watchlist, setWatchlist] = useWatchlist()
  const navigate = useNavigate()
  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-center font-extrabold">{`Hello ${
            auth?.token && auth?.user?.name
          }`}</h1>
        </div>
        <div>
          {watchlist?.length > 0
            ? `you have ${watchlist.length} movies in your watchlist ${
                auth?.token ? "" : "plese login"
              }`
            : "your watchlist is empty"}
        </div>
        <div className="flex">
          {watchlist.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default WatchlistPage
