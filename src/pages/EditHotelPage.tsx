import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../axios/api-client";
import ManageHotelForm from "../components/adminHotel/ManageHotelForm";

const EditHotelPage = () => {
  const { hotelId } = useParams();
  // console.log("EditHotelPage ~ hoteId:", hotelId);
  const { data } = useQuery({
    queryKey: ["fetchMyHotelById", hotelId],
    queryFn: () => apiClient.getMyHotelById(hotelId! as string),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateMyHotel,
    onSuccess: () => {
      //  navigate("/my-hotels");
    },
    onError: (error: Error) => {
      console.log("Register ~ error:", error);
    },
  });

  // FormData HERE IS THE PREDEFINED TYPE PROVIDED TO HANDLE FORMDATA
  const saveHandler = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  // console.log("EditHotelPage ~ data:", data);
  return (
    <ManageHotelForm hotel={data} onSave={saveHandler} isPending={isPending} />
  );
};

export default EditHotelPage;
