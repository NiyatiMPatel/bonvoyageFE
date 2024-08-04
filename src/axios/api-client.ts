import Notification from "../layout/Toast";
import {
  BookingFormData,
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  RegisterFormValuesType,
  SearchQueryParams,
  SignInFromValueType,
  UserType,
} from "../types/types";
import axiosInstance from "./axios-utils";
import axios from "axios";

// GET USER DETAILS
export const userDetails = async (): Promise<UserType> => {
  try {
    const response = await axiosInstance.get("/api/users/me");

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // Notification.success(response?.data?.message);
    // console.log("userDetails ~ response:", response);
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("userDetails ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// USER REGISTRATION
export const register = async (formData: RegisterFormValuesType) => {
  try {
    const response = await axiosInstance.post("/api/users/register", formData);
    // console.log("register ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("register ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// USER LOGIN
export const login = async (formData: SignInFromValueType) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", formData);
    // console.log("login ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("login ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// USER LOGIN STATE VALIDATION THROUGH HTTP COOKIE VALIDATION
export const validateToken = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/validate-token", {
      withCredentials: true,
    });
    // console.log("validateToken ~ response:", response);
    if (response?.status !== 200) {
      throw new Error("Token invalid");
    }
    return response;
  } catch (error) {
    // console.log("validateToken ~ error:", error);
    throw new Error(error as string | undefined);
  }
};

// USER LOGOUT
export const logout = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    // console.log("logout ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("logout ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// ADD MY-HOTEL
export const addMyHotel = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/api/my-hotels", formData);
    // console.log("addMyHotel ~ response:", response);

    if (response?.status !== 201 ?? response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("addMyHotel ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// GET HOTELS FOR HOME
export const fetchHotels = async () => {
  try {
    const response = await axiosInstance.get("/api/hotels");
    // console.log("fetchHotels ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // Notification.success(response?.data?.message);
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getMyHotels ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// GET ALL MY-HOTELS
export const getMyHotels = async (): Promise<HotelType[]> => {
  try {
    const response = await axiosInstance.get("/api/my-hotels");
    // console.log("getMyHotels ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // Notification.success(response?.data?.message);
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getMyHotels ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// GET SINGLE HOTEL
export const getMyHotelById = async (hotelId: string): Promise<HotelType> => {
  try {
    const response = await axiosInstance.get(`/api/my-hotels/${hotelId}`);
    // console.log("getMyHotelById ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // Notification.success(response?.data?.message);
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getMyHotelById ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// UPDATE SINGLE HOTEL
export const updateMyHotel = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `/api/my-hotels/${formData.get("hotelId")}`,
      formData
    );
    // console.log("updateMyHotel ~ response:", response);

    if (response?.status !== 201 ?? response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("updateMyHotel ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// GET HOTELS BASED ON SEARCH
export const searchHotels = async (
  searchQueryParams: SearchQueryParams
): Promise<HotelSearchResponse> => {
  try {
    const queryParams = new URLSearchParams(); // predefined object
    queryParams.append("page", searchQueryParams.page || "");
    queryParams.append("destination", searchQueryParams.destination || "");
    queryParams.append("checkIn", searchQueryParams.checkIn || "");
    queryParams.append("checkOut", searchQueryParams.checkOut || "");
    queryParams.append("adultCount", searchQueryParams.adultCount || "");
    queryParams.append("childCount", searchQueryParams.childCount || "");
    queryParams.append("maxPrice", searchQueryParams.maxPrice || "");
    queryParams.append("sortOption", searchQueryParams.sortOption || "");

    searchQueryParams.facilities?.forEach((facility) =>
      queryParams.append("facilities", facility)
    );

    searchQueryParams.types?.forEach((type) =>
      queryParams.append("types", type)
    );
    searchQueryParams.stars?.forEach((star) =>
      queryParams.append("stars", star)
    );

    const response = await axiosInstance.get(
      `/api/hotels/search?${queryParams}`
    );
    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // Notification.success(response?.data?.message);
    // console.log("searchHotels ~ response:", response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("searchHotels ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// GET HOTEL DETAILS
export const hotelDetails = async (hotelId: string): Promise<HotelType> => {
  try {
    const response = await axiosInstance.get(`/api/hotels/${hotelId}`);
    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // console.log("hotelDetails ~ response:", response);
    // Notification.success(response?.data?.message);

    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("searchHotels ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

//PAYMENT INTENT ENDPOINT
export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  try {
    const response = await axiosInstance.post(
      `/api/hotels/${hotelId}/bookings/payment-intent`,
      { numberOfNights: numberOfNights.toString() },
      {
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json",
        },
      }
    );
    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // console.log("createPaymentIntent ~ response:", response);
    // Notification.success(response?.data?.message);

    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("searchHotels ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// BOOKING POST ENDPOINT
export const createBooking = async (formData: BookingFormData) => {
  try {
    const response = await axiosInstance.post(
      `/api/hotels/${formData.hotelId}/bookings/`,
      formData
    );
    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // console.log("createBooking ~ response:", response);
    Notification.success(response?.data?.message);

    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("searchHotels ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// MY BOOKINGS GET ENDPOINT
export const getBookings = async (): Promise<HotelType[]> => {
  try {
    const response = await axiosInstance.get("/api/my-bookings");
    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // Notification.success(response?.data?.
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getBookings ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};
