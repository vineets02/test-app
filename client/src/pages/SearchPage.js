import React from "react"
import Layout from "../components/layout/Layout"
import { useSearch } from "../context/Search"
import MovieCard from "../components/MovieCard"

function SearchPage() {
  const [values, setValues] = useSearch()
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <p className="text-2xl font-bold">search result</p>
          <p>
            {values?.results.length < 1
              ? "No Movies Found"
              : `Found ${values?.results.length}`}
          </p>
          <div className="flex items-center space-x-0.5  md:space-x-2.5 md:p-2">
            {values?.results.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage
