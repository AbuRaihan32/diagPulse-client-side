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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },

  // ! Dashboard
  {
    path: "/dashboard",
    element: <DashboardRoot></DashboardRoot>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // Public Routes
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
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "addTest",
        element: <AddTest></AddTest>,
      },
      {
        path: "allTests",
        element: <AllTests></AllTests>,
      },
      {
        path: "addBanner",
        element: <AddBanner></AddBanner>,
      },
      {
        path: "allBanners",
        element: <AllBanners></AllBanners>,
      },
      {
        path: "reservations",
        element: <Reservations></Reservations>,
      },
    ],
  },
]);
