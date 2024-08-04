import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";


const ProtectedRouteWrapper = () => {
  const location = useLocation();
  const {isLoggedIn} = useUserContext();
  if (!isLoggedIn) {
    // Redirect to the login page or handle unauthorized access
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRouteWrapper;
