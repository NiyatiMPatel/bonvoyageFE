import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import * as apiClient from "../axios/api-client";
import { useQuery } from "@tanstack/react-query";
import SearchResultsCard from "../components/search/SearchResultsCard";
import Pagination from "../components/search/Pagination";
import StarRatingFilter from "../components/search/StarRatingFilter";
import FacilitiesFilter from "../components/search/FacilitiesFilter";
import HotelTypesFilter from "../components/search/HotelTypesFilter";
import PriceFilter from "../components/search/PriceFilter";
import { RootState } from "../redux/store";
import { SearchQueryParams } from "../types/types";
const SearchPage = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const destination = useAppSelector(
    (state: RootState) => state?.search.destination
  );
  const checkIn = useAppSelector((state: RootState) => state?.search.checkIn);
  const checkOut = useAppSelector((state: RootState) => state?.search.checkOut);
  const adultCount = useAppSelector(
    (state: RootState) => state?.search.adultCount
  );
  const childCount = useAppSelector(
    (state: RootState) => state?.search.childCount
  );

  const searchParams: SearchQueryParams = {
    destination: destination,
    checkIn: new Date(checkIn).toISOString(),
    checkOut: new Date(checkOut).toISOString(),
    adultCount: adultCount.toString(),
    childCount: childCount.toString(),
    page: page?.toString(),
    stars: selectedStars,
    facilities: selectedFacilities,
    types: selectedHotelTypes,
    maxPrice: selectedPrice?.toString(),
    sortOption: sortOption,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetchSearchedHotels", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });
  // console.log("SearchResults ~ data:", data);
  // console.log("SearchPage ~ page:", page);

  // ============ FILTERS ==============
  // STAR RATING FILTER
  const starsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars(
      (prevValue) =>
        event.target.checked
          ? [...prevValue, starRating] //ADDING STAR RATING INTO EXISTING CHECKED ARRAY
          : prevValue.filter((star) => star !== starRating) //REMOVING STAR RATING FROM EXISTING ARRAY
    );
  };

  // HOTEL TYPES FILTER
  const hoteTypeChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const types = event.target.value;

    setSelectedHotelTypes(
      (prevValue) =>
        event.target.checked
          ? [...prevValue, types] //ADDING TYPES INTO EXISTING CHECKED ARRAY
          : prevValue.filter((star) => star !== types) //REMOVING TYPES FROM EXISTING ARRAY
    );
  };

  // FACILITIES FILTER
  const facilityChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facilities = event.target.value;

    setSelectedFacilities(
      (prevValue) =>
        event.target.checked
          ? [...prevValue, facilities] //ADDING FACILITIES INTO EXISTING CHECKED ARRAY
          : prevValue.filter((star) => star !== facilities) //REMOVING FACILITIES FROM EXISTING ARRAY
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5">
      {/* LEFT SIDE FILTER COLUMN */}
      <div className="rounded-lg bg-white border border-slate-300 p-5 h-fit sticky top-0 md:top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* FILTERS */}
          <StarRatingFilter
            selection={selectedStars}
            onChange={starsChangeHandler}
          />
          <HotelTypesFilter
            selection={selectedHotelTypes}
            onChange={hoteTypeChangeHandler}
          />
          <FacilitiesFilter
            selection={selectedFacilities}
            onChange={facilityChangeHandler}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      {/* RIGHT SIDE HOTELS SECTION */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          {isLoading && (
            <span className="block text-xl font-bold h-dvh">Loading....</span>
          )}
          {!isLoading && (
            <span className="text-xl font-bold">
              {data?.pagination.total} Hotels found
              {destination ? ` in ${destination}` : ""}
            </span>
          )}
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {data?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} key={hotel._id} />
        ))}
        <div>
          {data?.data?.length! > 0 && (
            <Pagination
              isLoading={isLoading}
              currentPage={data?.pagination.currentPage || 1}
              totalPages={data?.pagination.totalPages || 1}
              onPageChange={(page: number) => setPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
