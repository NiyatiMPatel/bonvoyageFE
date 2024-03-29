import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { BookingFormData, BookingFormProps } from "../../types/types";
import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../axios/api-client";
import {
  setAdultCount,
  setCheckIn,
  setCheckOut,
  setChildCount,
  setDestination,
} from "../../redux/searchSlice";

const BookingForm = ({ currentUser, paymentIntentData }: BookingFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const { hotelId } = useParams();

  const dispatch = useAppDispatch();

  const checkIn = useAppSelector((state: RootState) => state?.search.checkIn);
  const checkOut = useAppSelector((state: RootState) => state?.search.checkOut);
  const adultCount = useAppSelector(
    (state: RootState) => state?.search.adultCount
  );
  const childCount = useAppSelector(
    (state: RootState) => state?.search.childCount
  );
  const initialValues: BookingFormData = {
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    email: currentUser?.email,
    adultCount: adultCount,
    childCount: childCount,
    checkIn: new Date(checkIn).toISOString(),
    checkOut: new Date(checkOut).toISOString(),
    hotelId: hotelId ?? "",
    totalCost: paymentIntentData.totalCost,
    paymentIntentId: paymentIntentData.paymentIntentId,
  };

  const { mutate: bookyRoom, isPending } = useMutation({
    mutationFn: apiClient.createBooking,
    onSuccess: () => {
      dispatch(setDestination(""));
      dispatch(setCheckIn(new Date()));
      dispatch(setCheckOut(new Date()));
      dispatch(setAdultCount(1));
      dispatch(setChildCount(0));
    },
    onError: (error: Error) => {
      console.log("BookingForm ~ error:", error);
    },
  });

  const submitHandler = async (formData: BookingFormData) => {
    console.log("submitHandler ~ formData:", formData);
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe?.confirmCardPayment(
      paymentIntentData.clientSecret,
      {
        payment_method: {
          card: elements?.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    if (result.paymentIntent?.status === "succeeded") {
      // book hotel room
      bookyRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {() => (
        <Form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
          <span className="text-3xl font-bold">Confirm Your Details</span>
          <div className="grid grid-cols-2 gap-6">
            <label className="text-gray-700 text-sm font-bold flex-1">
              First Name
              <Field
                name="firstName"
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
              />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Last Name
              <Field
                name="lastName"
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
              />
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Email
              <Field
                name="email"
                className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                type="text"
                readOnly
                disabled
              />
            </label>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Your Price Summary</h2>

            <div className="bg-blue-200 p-4 rounded-md">
              <div className="font-semibold text-lg">
                Total Cost: ${paymentIntentData.totalCost.toFixed(2)}
              </div>
              <div className="text-xs">Includes taxes and charges</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold"> Payment Details</h3>
            <CardElement
              id="payment-element"
              className="border rounded-md p-2 text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={isPending}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
            >
              {isPending ? "Saving..." : "Confirm Booking"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;
