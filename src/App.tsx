import { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = lazy(() => import("./layout/Layout"));
const ProtectedRouteWrapper = lazy(() => import("./components/auth/ProtectedRouteWrapper"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const AddHotelPage = lazy(() => import("./pages/AddHotelPage"));
const MyHotelsPage = lazy(() => import("./pages/MyHotelsPage"));
const EditHotelPage = lazy(() => import("./pages/EditHotelPage"));
const HotelDetailPage = lazy(() => import("./pages/HotelDetailPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const MyBookingsPage = lazy(() => import("./pages/MyBookingsPage"));

let router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "/detail/:hotelId",
        element: <HotelDetailPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
        errorElement: <ErrorPage />,
      },
      {
        element: <ProtectedRouteWrapper />,
        children: [
          {
            path: "my-hotels",
            element: <MyHotelsPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "add-hotel",
            element: <AddHotelPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: `edit-hotel/:hotelId`,
            element: <EditHotelPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: `hotel/:hotelId/booking`,
            element: <BookingPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "my-bookings",
            element: <MyBookingsPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
