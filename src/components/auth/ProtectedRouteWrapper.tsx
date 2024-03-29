import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const ProtectedRouteWrapper = () => {
  const location = useLocation();
  const isLoggedIn = useAppSelector(
    (state: RootState) => state?.user.isLoggedIn
  );
  if (!isLoggedIn) {
    // Redirect to the login page or handle unauthorized access
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRouteWrapper;
