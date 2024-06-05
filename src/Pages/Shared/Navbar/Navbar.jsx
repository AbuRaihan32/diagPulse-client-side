import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { RiEye2Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isAdmin } = useAdmin();

  const NavLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3"
              : "py-[6px] px-3"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3"
              : "py-[6px] px-3"
          }
          to={"/allTestForUser"}
        >
          All Tests
        </NavLink>
      </li>

      {user && (
        <>
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3"
                      : "py-[6px] px-3"
                  }
                  to={"/dashboard/allUsers"}
                >
                  Admin Dashboard
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3"
                      : "py-[6px] px-3"
                  }
                  to={"/dashboard/myProfile"}
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}
        </>
      )}
    </>
  );

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
    <div className="navbar z-50 mt-6 lg:pr-8 mb-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu z-30 text-[#32CD32] menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {NavLinks}
            <li>
              <div className="">
                {user ? (
                  <button onClick={signOutBtnHandler} className="flex gap-3">
                    <BiLogOutCircle className="text-xl"></BiLogOutCircle> Sign
                    Out
                  </button>
                ) : (
                  <Link to={"/login"} className="flex gap-3">
                    <BiLogInCircle className="text-xl"></BiLogInCircle>Login
                  </Link>
                )}
              </div>
            </li>

            <li>
              <div className="">
                {user ? (
                  ""
                ) : (
                  <Link to={"/register"} className="flex gap-3">
                    <BiLogInCircle className="text-xl"></BiLogInCircle>Register
                  </Link>
                )}
              </div>
            </li>
          </ul>
        </div>
        <a className="flex items-center gap-2 pl-2 text-xl md:text-3xl font-bold">
          YummyF
          <span className="text-xl md:text-3xl flex -mr-2 -ml-2 font-extrabold text-[#32CD32]">
            <RiEye2Line></RiEye2Line>
            <RiEye2Line className="-ml-[3px] rotate-90"></RiEye2Line>
          </span>{" "}
          D
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 gap-2 items-center font-semibold">
          {NavLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="mr-3">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        {user ? (
          <>
            <div className="relative">
              <div className="avatar mr-5 z-20 flex md:gap-4">
                <div
                  title={`${user.displayName}`}
                  className="w-10 rounded-full ring ring-[#32CD32] ring-offset-base-100 ring-offset-2"
                >
                  <img
                    src={
                      user?.photoURL ? user.photoURL : "/public/icons8-user.gif"
                    }
                  />
                </div>
              </div>
              <div className="absolute -top-[15px] right-[5px] z-10">
                <PuffLoader color="lime" size={70}></PuffLoader>
              </div>
            </div>

            <button
              onClick={signOutBtnHandler}
              className="relative px-5 py-2 w-[140px] font-medium group hidden md:inline"
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] border border-[#32CD32] group-hover:border-[#32CD32] group-hover:skew-x-[18deg]"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] border border-[#32CD32] group-hover:border-[#32CD32] group-hover:-skew-x-[18deg]"></span>

              <span className="flex items-center gap-2 relative">
                <BiLogOutCircle className="text-xl"></BiLogOutCircle> Sign Out
              </span>
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="relative px-5 py-2 font-medium group mr-5"
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] border border-[#32CD32] group-hover:border-[#32CD32] group-hover:skew-x-[18deg]"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] border border-[#32CD32] group-hover:border-[#32CD32] group-hover:-skew-x-[18deg]"></span>

              <span className="flex items-center gap-2 relative">
                <BiLogInCircle className="text-xl"></BiLogInCircle>{" "}
                <span className="hidden md:inline">Sign In</span>{" "}
              </span>
            </Link>

            <Link
              to={"/register"}
              className="relative px-5 py-2 font-medium group mr-5 hidden md:inline"
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] border border-[#32CD32] group-hover:border-[#32CD32] group-hover:skew-x-[18deg]"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] border border-[#32CD32] group-hover:border-[#32CD32] group-hover:-skew-x-[18deg]"></span>

              <span className="flex items-center gap-2 relative">
                <BiLogInCircle className="text-xl"></BiLogInCircle>{" "}
                <span className="hidden md:inline">Register</span>{" "}
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
