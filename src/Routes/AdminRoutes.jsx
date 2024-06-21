import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";
import { PuffLoader } from "react-spinners";

const AdminRoutes = ({ children }) => {
  const { isAdmin, isPending } = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#2EE9B1"></PuffLoader>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

AdminRoutes.propTypes = {
  children: PropTypes.node,
};
export default AdminRoutes;
