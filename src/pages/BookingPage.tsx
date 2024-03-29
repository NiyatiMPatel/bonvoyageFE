import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../axios/api-client";
import BookingDetailSummary from "../components/booking/BookingDetailSummary";
import BookingForm from "../components/booking/BookingForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../stripe/StripeConfig";

const BookingPage = () => {
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const { hotelId } = useParams();
  // console.log("Booking ~ hotelId:", hotelId);

  const checkin = useAppSelector((state: RootState) => state?.search.checkIn);
  const checkout = useAppSelector((state: RootState) => state?.search.checkOut);

  const checkIn = new Date(checkin);
  const checkOut = new Date(checkout);

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights =
        // check out time in ms minus check in time in ms / (1000 * 60 * 60 * 24) => No. of Days
        Math.abs(checkOut.getTime() - checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [checkIn, checkOut]);

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelDetail", hotelId],
    queryFn: () => apiClient.hotelDetails(hotelId as string),
    enabled: !!hotelId,
  });
  // console.log("BookingPage ~ hotel:", hotel);

  const { data: currentUser } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: apiClient.userDetails,
  });
  // console.log("BookingPage ~ currentUser:", currentUser?.email);

  const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent"],
    queryFn: () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    enabled: !!hotelId && numberOfNights > 0,
  });
  // console.log("BookingPage ~ paymentIntentData:", paymentIntentData);

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4">
      <BookingDetailSummary hotel={hotel} numberOfNights={numberOfNights} />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntentData={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default BookingPage;
