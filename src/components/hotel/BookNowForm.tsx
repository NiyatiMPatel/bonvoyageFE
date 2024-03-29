import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setAdultCount,
  setCheckIn,
  setCheckOut,
  setChildCount,
} from "../../redux/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { BookNowProps, GuestBookNowFormData } from "../../types/types";

const BookNowForm = ({ hotelId, pricePerNight }: BookNowProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoggedIn = useAppSelector(
    (state: RootState) => state?.user.isLoggedIn
  );
  const checkIn = useAppSelector((state: RootState) => state?.search.checkIn);
  const checkOut = useAppSelector((state: RootState) => state?.search.checkOut);
  const adultCount = useAppSelector(
    (state: RootState) => state?.search.adultCount
  );
  const childCount = useAppSelector(
    (state: RootState) => state?.search.childCount
  );

  const initialValues: GuestBookNowFormData = {
    checkIn: checkIn,
    checkOut: checkOut,
    adultCount: adultCount,
    childCount: childCount,
  };

  const validationSchema = Yup.object({
    adultCount: Yup.number()
      .min(1, "There must be at least one adult")
      .required("Number of adults is required"),
  });

  const signInToBookSubmit = (values: GuestBookNowFormData) => {
    // console.log("signInToBookSubmit ~ values:", values);
    dispatch(setAdultCount(values.adultCount));
    dispatch(setChildCount(values.childCount));
    dispatch(setCheckOut(values.checkOut));
    dispatch(setCheckIn(values.checkIn));
    navigate("/sign-in", { state: { from: pathname } });
  };
  const bookNowSubmit = (values: GuestBookNowFormData) => {
    // console.log("bookNowSubmit ~ values:", values);
    dispatch(setAdultCount(values.adultCount));
    dispatch(setChildCount(values.childCount));
    dispatch(setCheckOut(values.checkOut));
    dispatch(setCheckIn(values.checkIn));
    navigate(`/hotel/${hotelId}/booking`); //BOOKING PAGE
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1); // 1 year from now

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight} per night</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={isLoggedIn ? bookNowSubmit : signInToBookSubmit}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 gap-4 items-center">
              <div>
                <Field name="checkIn">
                  {({ field }: any) => (
                    <DatePicker
                      name="checkIn"
                      dateFormat="dd-MM-yyyy"
                      selected={(field.value && new Date(field.value)) || null}
                      onChange={(date) => setFieldValue("checkIn", date)}
                      selectsStart
                      startDate={new Date(values.checkIn)}
                      endDate={new Date(values.checkOut)}
                      minDate={minDate}
                      maxDate={maxDate}
                      placeholderText="Check-in Date"
                      className="min-w-full bg-white p-2 focus:outline-none"
                      wrapperClassName="min-w-full"
                      // value={new Date(values.checkIn)}
                    />
                  )}
                </Field>
              </div>
              <div>
                <Field name="checkOut">
                  {({ field }: any) => (
                    <DatePicker
                      name="checkOut"
                      dateFormat="dd-MM-yyyy"
                      selected={(field.value && new Date(field.value)) || null}
                      onChange={(date) => setFieldValue("checkOut", date)}
                      selectsStart
                      startDate={new Date(values.checkIn)}
                      endDate={new Date(values.checkOut)}
                      minDate={minDate}
                      maxDate={maxDate}
                      placeholderText="Check-out Date"
                      className="min-w-full bg-white p-2 focus:outline-none"
                      wrapperClassName="min-w-full"
                      // value={new Date(values.checkOut)}
                    />
                  )}
                </Field>
              </div>
              <div className="flex bg-white px-2 py-1 gap-2">
                <label
                  className="items-center flex flex-1"
                  htmlFor="adultCount"
                >
                  Adults:
                  <Field
                    className="w-full p-1 focus:outline-none font-bold"
                    type="number"
                    min={1}
                    max={20}
                    name="adultCount"
                    id="adultCount"
                    // value={values.adultCount}
                  />
                </label>
                <label
                  className="items-center flex flex-1"
                  htmlFor="childCount"
                >
                  Children:
                  <Field
                    className="w-full p-1 focus:outline-none font-bold"
                    type="number"
                    min={0}
                    max={20}
                    name="childCount"
                    id="childCount"
                    // value={values.childCount}
                  />
                </label>
              </div>
              <ErrorMessage
                className="text-red-500"
                name="adultCount"
                component="div"
              />

              {/* <div className="flex gap-1"> */}
              {isLoggedIn ? (
                <button
                  type="submit"
                  className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl"
                >
                  Book Now
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl"
                >
                  Sign in to Book
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookNowForm;
