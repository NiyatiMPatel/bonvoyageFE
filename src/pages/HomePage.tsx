import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../axios/api-client";
import Home from "../components/home/Home";

const HomePage = () => {
  const { data } = useQuery({
    queryKey: ["fetchAllMyHotels"],
    queryFn: apiClient.fetchHotels,
  });
  if (!data || data.length === 0) {
    return <span>No Hotels Found</span>;
  }
  return <Home hotels={data} />;
};
export default HomePage;
