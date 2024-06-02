import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <ul>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
              : "py-[6px] px-3 block"
          }
          to={"/dashboard/allUsers"}
        >
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
              : "py-[6px] px-3 block"
          }
          to={"/dashboard/addTest"}
        >
          Add Test
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
              : "py-[6px] px-3 block"
          }
          to={"/dashboard/allTests"}
        >
          All Tests
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
              : "py-[6px] px-3 block"
          }
          to={"/dashboard/reservations"}
        >
          Reservations
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
              : "py-[6px] px-3 block"
          }
          to={"/dashboard/addBanner"}
        >
          Add Banner
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border border-[#32CD32] hover:bg-[#008000] hover:text-white rounded-md py-[7px] px-3 block"
              : "py-[6px] px-3 block"
          }
          to={"/dashboard/allBanners"}
        >
          All Banners
        </NavLink>
      </li>
    </ul>
  );
};

export default AdminNavbar;
