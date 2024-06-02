import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
                : "py-[6px] px-3 block"
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
                ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
                : "py-[6px] px-3 block"
            }
            to={"/about"}
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PublicNavbar;
