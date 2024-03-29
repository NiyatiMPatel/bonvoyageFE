import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../components/adminHotel/ManageHotelForm";
import * as apiClient from "../axios/api-client";
// import { useNavigate } from "react-router-dom";

const AddHotelPage = () => {
  // const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      // navigate("/my-hotels");
    },
    onError: (error: Error) => {
      console.log("Register ~ error:", error);
    },
  });
  // FormData HERE IS THE PREDEFINED TYPE PROVIDED TO HANDLE FORMDATA
  const saveHandler = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={saveHandler} isPending={isPending} />;
};

export default AddHotelPage;
