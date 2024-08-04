import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../axios/api-client.ts";
import MyBookings from "../components/booking/MyBookings.tsx";

const MyBookingsPage = () => {
  const { data: hotels } = useQuery({
    queryKey: ["fetchMyBookings"],
    queryFn: () => apiClient.getBookings(),
  });
  // console.log("MyBookings ~ hotels:", hotels);

  if (!hotels || hotels.length === 0) {
    return <span>No Bookings Found</span>;
  }
  return <MyBookings hotels={hotels} />;
};

export default MyBookingsPage;
