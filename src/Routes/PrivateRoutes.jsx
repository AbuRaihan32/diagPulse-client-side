import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { PuffLoader } from "react-spinners";
import useAuth from "../Hooks/useAuth";
import useCurrentUser from "../Hooks/useCurrentUser";

const PrivateRouts = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const {currentUser, isPending } = useCurrentUser();

  if (loading || isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#2EE9B1"></PuffLoader>
      </div>
    );
  }

  if (user && currentUser.status === 'Active') {
    return children;
  }
  return <Navigate to={"/login"} state={location.pathname}></Navigate>;
};

PrivateRouts.propTypes = {
  children: PropTypes.node,
};
export default PrivateRouts;
