import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { PuffLoader } from "react-spinners";
import useAuth from "../Hooks/useAuth";

const PrivateRouts = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#32cd32"></PuffLoader>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={location.pathname}></Navigate>;
};

PrivateRouts.propTypes = {
  children: PropTypes.node,
};
export default PrivateRouts;
