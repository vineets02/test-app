import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
// import Exclusive from "./pages/Exclusive"
// import Movies from "./pages/Movies"
import WebShows from "./pages/WebShows"
import Dashboard from "./pages/user/Dashboard"
import PrivateRoute from "./components/route/private"
import ForgotPassword from "./pages/auth/ForgotPassword"
// import "bootstrap/dist/css/bootstrap.min.css"

// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.bundle.min"
// import $ from "jquery"
// import Popper from "popper.js"
import AdminRoute from "./components/route/AdminRoutes"
import AdminDashboard from "./pages/admin/AdminDashboard"
import PageNotFound from "./pages/PageNotFound"
import Webshows from "./pages/admin/Webshows"
import Movies from "./pages/admin/movies/Movies"
import Movie from "./pages/Movie"
import Exclusive from "./pages/Exclusive"
import Genres from "./pages/admin/genre/Genres"
import AddMovies from "./pages/admin/movies/AddMovies"
import EditMovie from "./pages/admin/movies/EditMovie"
import AddGenre from "./pages/admin/genre/AddGenre"
import EditGenre from "./pages/admin/genre/EditGenre"
import ContentType from "./pages/contentType/ContentType"
import AddContentType from "./pages/contentType/AddContentType"
import EditContentType from "./pages/contentType/EditContentType"
import MovieDetails from "./pages/admin/movies/MovieDetails"
import WatchlistPage from "./pages/WatchlistPage"
import SearchPage from "./pages/SearchPage"
import RentPage from "./pages/RentPage"
import OrderPage from "./pages/user/OrderPage"
import AllOrders from "./pages/admin/AllOrders"
import PaymentSuccess from "./components/PaymentSuccess"
import ChangePassword from "./pages/auth/ChangePassword"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/movie/:slug" element={<MovieDetails />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/change-password" element={<ChangePassword />} />
          <Route path="user/rent" element={<RentPage />} />
          <Route path="user/orders" element={<OrderPage />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/movies" element={<Movies />} />
          <Route path="admin/allorders" element={<AllOrders />} />
          <Route path="admin/addmovie" element={<AddMovies />} />
          <Route path="admin/edit-movie/:slug" element={<EditMovie />} />
          <Route path="admin/genre" element={<Genres />} />
          <Route path="admin/addgenre" element={<AddGenre />} />
          <Route path="admin/edit-genre/:slug" element={<EditGenre />} />

          <Route path="admin/contenttype" element={<ContentType />} />
          <Route path="admin/addcontenttype" element={<AddContentType />} />
          <Route
            path="admin/edit-contenttype/:slug"
            element={<EditContentType />}
          />

          <Route path="admin/webshows" element={<Webshows />} />
          <Route path="admin/exclusive" element={<Exclusive />} />
          <Route path="admin/genres" element={<Genres />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/exclusive" element={<Exclusive />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/webshows" element={<WebShows />} />
      </Routes>
    </>
  )
}

export default App
