import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import DashboardRoot from "../Layout/DashboardRoot/DashboardRoot";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile/MyProfile";
import Appointments from "../Pages/Dashboard/UserDashboard/Appointments/Appointments";
import TestResults from "../Pages/Dashboard/UserDashboard/TestResults/TestResults";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers/AllUsers";
import AddTest from "../Pages/Dashboard/AdminDashboard/AddTest/AddTest";
import AllBanners from "../Pages/Dashboard/AdminDashboard/AllBanners/AllBanners";
import AddBanner from "../Pages/Dashboard/AdminDashboard/AddBanner/AddBanner";
import Reservations from "../Pages/Dashboard/AdminDashboard/Reservations/Reservations";
import AllTests from "../Pages/Dashboard/AdminDashboard/AllTests/AllTests";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import PrivateRouts from "./PrivateRoutes";
import Home from "../Pages/Home/Home/Home";
import AllTestsForUser from "../Pages/AllTestsFoUser/AllTestsForUser";
import Details from "../Pages/Details/Details";
import UserHome from "../Pages/Dashboard/UserDashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import AdminRoutes from "./AdminRoutes";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/allTestForUser',
        element: <AllTestsForUser></AllTestsForUser>,
        loader: () => fetch('https://diag-pulse-server-site.vercel.app/testCount')
      },
      {
        path: 'details/:id',
        element: <PrivateRouts><Details></Details></PrivateRouts>
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },

  // ! Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRouts>
        <DashboardRoot></DashboardRoot>
      </PrivateRouts>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // Public Routes
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "appointments",
        element: <Appointments></Appointments>,
      },
      {
        path: "testResult",
        element: <TestResults></TestResults>,
      },

      // Admin Routes

      {
        path: 'adminHome',
        element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
      },
      {
        path: "allUsers",
        element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>,
      },
      {
        path: "addTest",
        element: <AdminRoutes><AddTest></AddTest></AdminRoutes>,
      },
      {
        path: "allTests",
        element:<AdminRoutes><AllTests></AllTests></AdminRoutes> ,
      },
      {
        path: "addBanner",
        element: <AdminRoutes><AddBanner></AddBanner></AdminRoutes>,
      },
      {
        path: "allBanners",
        element: <AdminRoutes><AllBanners></AllBanners></AdminRoutes>,
      },
      {
        path: "reservations",
        element: <AdminRoutes><Reservations></Reservations></AdminRoutes>,
      },
    ],
  },
]);
