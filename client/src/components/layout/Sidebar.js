import React, { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import "./sidebar.css"
import { HiMenuAlt3 } from "react-icons/hi"
// import { MdOutlineDashboard } from "react-icons/md"
// import { RiSettings4Line } from "react-icons/ri"
// import { TbReportAnalytics } from "react-icons/tb"
// import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai"
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi"
// import Link from "next/link"
import { MdDashboard } from "react-icons/md"
// import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi"
import { BsFillChatDotsFill, BsGraphUp } from "react-icons/bs"
// import { HiMenuAlt3 } from "react-icons/hi"
import { TiThLargeOutline } from "react-icons/ti"
function Sidebar() {
  const [open, setOpen] = useState(true)
  const Menus = [
    { title: "Dashboard", icon: MdDashboard, route: "/dashboard/admin" },
    { title: "Inbox", icon: BsFillChatDotsFill, route: "/inbox" },
    {
      title: "Movies",
      icon: FiMessageSquare,
      gap: true,
      route: "/dashboard/admin/movies",
    },
    {
      title: "Orders",
      icon: FiMessageSquare,
      gap: true,
      route: "/dashboard/admin/allorders",
    },
    {
      title: "content type",
      icon: TiThLargeOutline,
      route: "/dashboard/admin/contenttype",
    },
    { title: "Genre", icon: FiFolder, route: "/dashboard/admin/genre" },
    { title: "Analytics", icon: FiShoppingCart, route: "/analytics" },
  ]

  useEffect(() => {
    setOpen(!open)
  }, [])
  return (
    <div>
      <section className="flex gap-80 sm:h-[580px] sm:absolute">
        <div
          className={`bg-[#1C1C1C]  min-h-screen    ${
            open ? "w-80" : "w-16 shadow-lg  shadow-[#F5A509]"
          } duration-500 text-gray-100 px-4 `}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer "
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="flex gap-x-4 items-center">
            <img
              src="./src/assets/logo.png"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Designer
            </h1>
          </div>
          <ul className="mt-4 flex flex-col gap-6 relative">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <NavLink to={Menu.route} activeclassname="active">
                  <div>
                    <div className="flex">
                      <Menu.icon size={20} color="#F5A509" />
                    </div>
                    <div
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      <h2
                        style={{
                          transitionDelay: `${index + 3}00ms`,
                          color: "#fff",
                        }}
                        className={`whitespace-pre duration-500 ${
                          !open &&
                          "opacity-0 bg-orange-600 translate-x-28 overflow-hidden"
                        }`}
                      >
                        {Menu?.title}
                      </h2>
                      <h2
                        className={`${
                          open && "hidden"
                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                      >
                        {Menu?.title}
                      </h2>
                    </div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Sidebar
