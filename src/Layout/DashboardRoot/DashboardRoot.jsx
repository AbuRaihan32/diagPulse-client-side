import { Outlet } from "react-router-dom";
import AdminNavbar from "../../Pages/Dashboard/Navbar/AdminNavbar";
import UserNavbar from "../../Pages/Dashboard/Navbar/UserNavbar";
import PublicNavbar from "../../Pages/Dashboard/Navbar/PublicNavbar";
import Lottie from "lottie-react";
import bg from "../../../public/bg1.json";
import bg2 from "../../../public/bg2.json";
import bg3 from "../../../public/bg3.json";


const DashboardRoot = () => {
  // TODO: get admin value from database
  const isAdmin = false;

  return (
    <div className="max-w-7xl mx-auto flex">
      <div className="w-[300px] bg-[#00247A] h-screen text-white p-10">
        {isAdmin ? <AdminNavbar></AdminNavbar> : <UserNavbar></UserNavbar>}
        <div className="divider divider-accent opacity-45"></div>
        <PublicNavbar></PublicNavbar>
      </div>
      <div>
        <Outlet></Outlet>
        <Lottie animationData={bg}></Lottie>
        <Lottie animationData={bg2}></Lottie>
        <Lottie animationData={bg3}></Lottie>
      </div>
    </div>
  );
};

export default DashboardRoot;
