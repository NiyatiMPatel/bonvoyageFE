import { Link } from "react-router-dom";
import SignOutButton from "../signout/SignOutButton";
import { useUserContext } from "../../context/UserContext";

const Header = () => {
  const {isLoggedIn} = useUserContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        {/* LEFT CORNER OF HEADER WITH LOGO/COMPANY NAME */}
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">BonVoyage</Link>
        </span>
        {/* RIGHT CORNER OF HEADER WITH MENU ITEMS */}
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
