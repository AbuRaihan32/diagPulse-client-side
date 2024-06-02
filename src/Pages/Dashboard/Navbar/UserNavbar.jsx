import { NavLink } from "react-router-dom";

const UserNavbar = () => {
  return (
    <ul className="">
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
              : "py-[6px] px-3 block"
          }
          to={"/dashboard/myProfile"}
        >
          My Profile
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
              : "py-[6px] px-3 block"
          }
          to={"/dashboard/appointments"}
        >
          Upcoming Appointments
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
              : "py-[6px] px-3 block"
          }
          to={"/dashboard/testResult"}
        >
          Test Results
        </NavLink>
      </li>
    </ul>
  );
};

export default UserNavbar;
