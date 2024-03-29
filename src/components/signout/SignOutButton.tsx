import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../axios/api-client";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import {
  setAdultCount,
  setCheckIn,
  setCheckOut,
  setChildCount,
  setDestination,
  sethotelId,
} from "../../redux/searchSlice";
import { setLoggedIn } from "../../redux/userSlice";

const SignOutButton = () => {
  // REACT QUERY ACCESS AT GLOBAL LEVEL
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async () => {
      // Invalidate the "validateToken" query
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      dispatch(setDestination(""));
      dispatch(setCheckIn(new Date()));
      dispatch(setCheckOut(new Date()));
      dispatch(setAdultCount(1));
      dispatch(setChildCount(0));
      dispatch(sethotelId(""));
      dispatch(setLoggedIn(false));
      // // Clear persist:root in local storage
      // await persistor.purge();
      // // Clear all states in the Redux store
      // await persistor.flush();

      navigate("/");
    },
    onError: (error: Error) => {
      console.log("Register ~ error:", error);
    },
  });

  const logoutHandler = async () => {
    mutate();
  };
  return (
    <button
      type="submit"
      onClick={logoutHandler}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
    >
      {isPending ? "Signing Out" : "Sign Out"}
    </button>
  );
};

export default SignOutButton;
