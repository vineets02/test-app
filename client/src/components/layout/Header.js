import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineMobile,
} from "react-icons/ai"
import Input from "../Input"
import Button from "../Button"
import { useAuth } from "../../context/auth"
import { Dropdown } from "flowbite-react"
import { useWatchlist } from "../../context/watch"
import { BsFillBagFill, BsPersonCircle } from "react-icons/bs"
import SearchInput from "../SearchInput"
import { useRent } from "../../context/rent"
// import { Icon } from "../../../public/netflix_icon.jpg"

function Header() {
  const [auth, setAuth] = useAuth()
  const [watchlist] = useWatchlist()
  const [rent] = useRent()
  const [nav, setNav] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleNav = () => {
    setNav(!nav)
  }
  const handleLogin = () => {
    navigate("/login")
  }

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" })
    localStorage.removeItem("user")
    navigate("/login")
  }

  useEffect(() => {
    setNav(!nav)
  }, [])

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleDropdownItemClick = (path) => {
    navigate(path)
    setDropdownOpen(false)
  }
  return (
    <div>
      <div class="flex justify-between bg-[#18181818] bg-opacity-100 shadow sm:shadow-none dark:shadow-slate-300 item-center h-18 mx-auto px-4 text-white">
        <h1 className="my-3 py-4  items-center text-xl font-medium text-[#EFA80A]">
          Tortoise Motion Pictures
        </h1>
        {/* <div className=" mt-4  text-3xl font-bold" onClick={handleToggleTheme}>
          {currentTheme === "dark" ? (
            <BsMoonStarsFill
              className=" ease-in-out duration-75 text-cyan-900"
              size={20}
            />
          ) : (
            <BsSunFill
              className="text-yellow-500 ease-in-out duration-75"
              size={20}
            />
          )}
        </div> */}
        <div>
          <ul className="md:flex hidden py-2  justify-between items-center  text-black">
            {/* {currentTheme === "dark" ? "dark" : "light"} */}
            <Link to={"/"} className="">
              <li className="  text-white px-10 hover:border-b-2 hover:py-2 hover:border-[#EFA80A]">
                {" "}
                Home
              </li>
            </Link>
            {/* <Link to={"/exclusive"}>
              <li className=" text-white px-10 hover:border-b-2 hover:py-2 hover:border-[#EFA80A]">
                Exclusive
              </li>
            </Link> */}
            {/* <Link to={"/movies"}>
              <li className=" text-white px-10 hover:border-b-2 hover:py-2 hover:border-[#EFA80A]">
                Movies
              </li>
            </Link> */}
            {/* <Link to={"/webshows"}>
              <li className=" text-white px-10 hover:border-b-2 hover:py-2 hover:border-[#EFA80A]">
                WebShows
              </li>
            </Link> */}
            <Link to={"/watchlist"}>
              <li className=" text-white px-10 hover:border-b-2 hover:py-2 hover:border-[#EFA80A] flex ">
                Watchlist
                <span className="rounded-full mx-2 bg-orange-400">
                  {watchlist?.length}
                </span>
              </li>
            </Link>
            <Link to={"/dashboard/user/rent"}>
              {rent.length > 0 && (
                <li className="text-white px-10 hover:border-b-2 hover:py-2 hover:border-[#EFA80A] flex">
                  <BsFillBagFill />
                  <span className="rounded-full mx-2 bg-orange-400">
                    {rent.length}
                  </span>
                </li>
              )}
            </Link>
            <div className="flex px-3 py-2">
              {/* <Input
                style={{
                  border: "1px solid #8A8989",
                  borderRadius: 8,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  backgroundColor: "transparent",
                  color: "#FFF",
                  // marginLeft: 10,
                }}
                placeholder={" search"}
                className=" text-black mx-3"
              /> */}
              <SearchInput />
              {!auth.user ? (
                <>
                  <Button
                    className="  hover:bg-[#EFA80A] text-white hover:text-white"
                    style={{
                      borderRadius: 8,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      // backgroundColor: "transparent",
                      border: "1px solid #EFA80A",
                      cursor: "pointer",
                    }}
                    onClick={handleLogin}
                  >
                    login
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-white"> </span>
                  {/* <Button
                  className="  hover:bg-[#EFA80A] text-white hover:text-white"
                  style={{
                    borderRadius: 8,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    // backgroundColor: "transparent",
                    border: "1px solid #EFA80A",
                    cursor: "pointer",
                  }}
                >
                  logout
                </Button> */}
                  {/* //dropdown */}
                  <div className="relative">
                    <img
                      src="/netflix_icon.jpg"
                      alt=""
                      style={{ width: "100%", height: 50, borderRadius: 15 }}
                      onClick={handleDropdownToggle}
                      className=" text-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    />

                    {dropdownOpen && (
                      <ul className="absolute right-0 mt-2 w-56 z-20 bg-white rounded-md shadow-lg">
                        <li className="block  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <span>Hello</span>{" "}
                          <span className="capitalize font-medium">
                            {auth?.user?.name}
                          </span>
                        </li>
                        <li>
                          <hr className="my-2 border-gray-200" />
                        </li>
                        <li>
                          <Link
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            onClick={() =>
                              handleDropdownItemClick(
                                `/dashboard/${
                                  auth?.user?.role === 1 ? "admin" : "user"
                                }`
                              )
                            }
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }/change-password`}
                            onClick={() =>
                              handleDropdownItemClick(
                                `/dashboard/${
                                  auth?.user?.role === 1 ? "admin" : "user"
                                }/change-password`
                              )
                            }
                          >
                            change password
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            to="/earnings"
                            onClick={() => handleDropdownItemClick("/earnings")}
                          >
                            Earnings
                          </Link>
                        </li>
                        <li>
                          <hr className="my-2 border-gray-200" />
                        </li>
                        <li>
                          <Link
                            className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                            to="/login"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>

                  {/* <div className="dropdown">
                  <button
                    className="btn  dropdown-toggle my-auto mx-auto   hover:bg-[#EFA80A] text-white hover:text-white"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      // borderRadius: 10,
                      // paddingTop: 10,
                      // paddingBottom: 10,
                      // paddingLeft: 20,
                      // paddingRight: 20,
                      // backgroundColor: "transparent",
                      // border: "1px solid #EFA80A",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src="https://picsum.photos/200/300"
                      //   alt={auth.user.username}
                      className=" "
                      style={{ width: "auto", height: "auto" }}
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a className="dropdown-item active" href="#">
                        Hello, {auth.user.username}
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link onClick={{}} href="/login">
                        Logout
                      </Link>
                      <a className="dropdown-item" href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div> */}
                  {/* <button
                  id="dropdownInformationButton"
                  data-dropdown-toggle="dropdownInformation"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                > */}
                  {/* Dropdown header{" "} */}
                  {/* <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button> */}
                </>
              )}
            </div>
            {/* <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div> */}
          </ul>
        </div>
        <div onClick={handleNav} className="block md:hidden">
          {!nav ? (
            <AiOutlineClose
              className=" p-4 text-[#EFA80A] "
              style={{}}
              size={50}
            />
          ) : (
            <AiOutlineMenu
              className=" font-extrabold p-4 text-[#EFA80A]"
              style={{}}
              size={50}
            />
          )}
        </div>
        <div
          className={
            !nav
              ? " left-0 top-0 w-[65%] absolute z-50 h-full border-r lg:hidden border-r-gray-900 bg-black ease-in-out duration-500"
              : "fixed left-[-100%]"
          }
        >
          <h1 className="w-full font-bold m-4 sm:text-sm text-[#EFA80A]">
            Tortoise Motion Pictures
          </h1>

          <ul className="uppercase p-4 text-white">
            <Link to={"/"}>
              <li className="p-4 hover:border-b-2 hover:border-[#659cb1] ">
                {" "}
                Home
              </li>
            </Link>
            <Link to={"/exclusive"}>
              <li className="p-4 hover:border-b-2 hover:border-[#659cb1] ">
                Exclusive
              </li>
            </Link>
            <Link to={"/movies"}>
              <li className="p-4 hover:border-b-2 hover:border-[#659cb1] ">
                Movies
              </li>
            </Link>
            <Link to={"/webshows"}>
              <li className="p-4 hover:border-b-2 hover:border-[#659cb1] ">
                webshows
              </li>
            </Link>
            <SearchInput />
            {!auth.user ? (
              <>
                <Button
                  className="  hover:bg-[#EFA80A] text-white hover:text-white"
                  style={{
                    borderRadius: 8,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    // backgroundColor: "transparent",
                    border: "1px solid #EFA80A",
                    cursor: "pointer",
                  }}
                  onClick={handleLogin}
                >
                  login
                </Button>
              </>
            ) : (
              <>
                <span className="text-white"> </span>
                {/* <Button
                  className="  hover:bg-[#EFA80A] text-white hover:text-white"
                  style={{
                    borderRadius: 8,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    // backgroundColor: "transparent",
                    border: "1px solid #EFA80A",
                    cursor: "pointer",
                  }}
                >
                  logout
                </Button> */}
                {/* //dropdown */}
                <div className="relative z-50">
                  <hr className=" text-[#fff] my-3" />
                  <div
                    onClick={handleDropdownToggle}
                    className=" cursor-pointer flex sm:flex py-2 justify-start align-middle items-center  sm:py-2"
                  >
                    <div>
                      <span>profile</span>
                    </div>
                    <div className="mx-2 ">
                      <img
                        src="/netflix_icon.jpg"
                        alt=""
                        style={{}}
                        className="w-12 rounded-full sm:w-12 h-12  sm:h-12"
                      />
                    </div>
                  </div>

                  {dropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-56 z-20 bg-white rounded-md shadow-lg">
                      <li className="block  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <span>Hello</span>{" "}
                        <span className="capitalize font-medium">
                          {auth?.user?.name}
                        </span>
                      </li>
                      <li>
                        <hr className="my-2 border-gray-200" />
                      </li>
                      <li>
                        <Link
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          onClick={() =>
                            handleDropdownItemClick(
                              `/dashboard/${
                                auth?.user?.role === 1 ? "admin" : "user"
                              }`
                            )
                          }
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          to="/settings"
                          onClick={() => handleDropdownItemClick("/settings")}
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          to="/earnings"
                          onClick={() => handleDropdownItemClick("/earnings")}
                        >
                          Earnings
                        </Link>
                      </li>
                      <li>
                        <hr className="my-2 border-gray-200" />
                      </li>
                      <li>
                        <Link
                          className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>

                {/* <div className="dropdown">
                  <button
                    className="btn  dropdown-toggle my-auto mx-auto   hover:bg-[#EFA80A] text-white hover:text-white"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      // borderRadius: 10,
                      // paddingTop: 10,
                      // paddingBottom: 10,
                      // paddingLeft: 20,
                      // paddingRight: 20,
                      // backgroundColor: "transparent",
                      // border: "1px solid #EFA80A",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src="https://picsum.photos/200/300"
                      //   alt={auth.user.username}
                      className=" "
                      style={{ width: "auto", height: "auto" }}
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a className="dropdown-item active" href="#">
                        Hello, {auth.user.username}
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link onClick={{}} href="/login">
                        Logout
                      </Link>
                      <a className="dropdown-item" href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div> */}
                {/* <button
                  id="dropdownInformationButton"
                  data-dropdown-toggle="dropdownInformation"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                > */}
                {/* Dropdown header{" "} */}
                {/* <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button> */}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
