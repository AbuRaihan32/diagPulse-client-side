import { CiBoxes, CiLineHeight } from "react-icons/ci";
import { FaUser, FaUsers } from "react-icons/fa";
import { FiAirplay } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoWalletOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";
import { MdOutlineResetTv } from "react-icons/md";
import { PiFlagBannerFoldLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <>
      <ul className="flex flex-col py-4 space-y-1">
        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
              ADMIN ROUTES
            </div>
          </div>
        </li>

        {/* All user */}
        <li>
          <NavLink
            to={"/dashboard/allUsers"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <FaUsers></FaUsers>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              All User
            </span>
          </NavLink>
        </li>

        {/* Add Test */}
        <li>
          <NavLink
            to={"/dashboard/addTest"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <FiAirplay></FiAirplay>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Add Test
            </span>
          </NavLink>
        </li>

        {/* Reservations */}
        <li>
          <NavLink
            to={"/dashboard/reservations"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <CiBoxes></CiBoxes>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Reservations
            </span>
          </NavLink>
        </li>

        {/* All test */}
        <li>
          <NavLink
            to={"/dashboard/allTests"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <IoWalletOutline></IoWalletOutline>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              All Test
            </span>
          </NavLink>
        </li>

        {/* add Banner */}
        <li>
          <NavLink
            to={"/dashboard/addBanner"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <PiFlagBannerFoldLight></PiFlagBannerFoldLight>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Add Banner
            </span>
          </NavLink>
        </li>

        {/* All Banner */}
        <li>
          <NavLink
            to={"/dashboard/allBanners"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <LuWallet></LuWallet>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              All Banner
            </span>
          </NavLink>
        </li>

        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center mt-5 h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
              PUBLIC ROUTES
            </div>
          </div>
        </li>
        {/* Home */}
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <GoHome></GoHome>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">Home</span>
          </NavLink>
        </li>

        {/* My Profile */}
        <li>
          <NavLink
            to={"/dashboard/myProfile"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <FaUser></FaUser>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              My Profile
            </span>
          </NavLink>
        </li>

        {/* Upcoming Appointments*/}
        <li>
          <NavLink
            to={"/dashboard/appointments"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <CiLineHeight></CiLineHeight>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Upcoming Appointments
            </span>
          </NavLink>
        </li>

        {/* Test Results */}
        <li>
          <NavLink
            to={"/dashboard/testResult"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <MdOutlineResetTv></MdOutlineResetTv>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Test Results
            </span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default AdminNavbar;
