import { CiLineHeight } from "react-icons/ci";
import { FaHome, FaUser } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { MdOutlineResetTv } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { BiLogOutCircle } from "react-icons/bi";

const UserNavbar = () => {
  const { logOut } = useAuth();

  const signOutBtnHandler = () => {
    logOut().then(() => {
      Swal.fire({
        title: "Logged Out!",
        text: "You have been Logged Out.",
        icon: "success",
      });
    });
  };
  return (
    <>
      <ul className="flex flex-col py-4 space-y-1">
        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
              Public Routes
            </div>
          </div>
        </li>

        {/* User Dashboard Home*/}
        <li>
          <NavLink
            to={"/dashboard/userHome"}
            className={({ isActive }) =>
              isActive
                ? "relative flex flex-row items-center h-11 outline-none bg-blue-800 dark:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:border-gray-800 pr-6"
                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            }
          >
            <span className="inline-flex justify-center items-center ml-4">
              <FaHome></FaHome>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Dashboard Home
            </span>
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

        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center mt-5 h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
              Normal Routes
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

        {/* sign Out*/}
        <li>
          <button
            onClick={signOutBtnHandler}
            className="w-full relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
              <BiLogOutCircle className="text-xl"></BiLogOutCircle>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              Sign Out
            </span>
          </button>
        </li>
      </ul>
    </>
  );
};

export default UserNavbar;
