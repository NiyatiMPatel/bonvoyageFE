import { useParams } from "react-router-dom";
import * as apiClient from "../axios/api-client";
import { useQuery } from "@tanstack/react-query";

import HotelDetail from "../components/hotel/HotelDetail";

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const { data } = useQuery({
    queryKey: ["fetchHotelDetail", hotelId],
    queryFn: () => apiClient.hotelDetails(hotelId as string),
    enabled: !!hotelId,
  });

  if (!data) {
    return <></>;
  }

  return <HotelDetail data={data} />;
};

export default HotelDetailPage;
