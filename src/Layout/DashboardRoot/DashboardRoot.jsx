import { Outlet } from "react-router-dom";
import AdminNavbar from "../../Pages/Dashboard/Navbar/AdminNavbar";
import UserNavbar from "../../Pages/Dashboard/Navbar/UserNavbar";
import useAdmin from "../../Hooks/useAdmin";

const DashboardRoot = () => {
  const {isAdmin} = useAdmin();
  return (
    <div
      className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white`}
    >
      <div className="fixed flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          {isAdmin ? <AdminNavbar></AdminNavbar> : <UserNavbar></UserNavbar>}
        </div>
      </div>
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div className="w-[90%] mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot;
