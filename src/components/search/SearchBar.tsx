import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "../../redux/hooks";
import {
  setDestination,
  setCheckIn,
  setCheckOut,
  setAdultCount,
  setChildCount,
} from "../../redux/searchSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdTravelExplore } from "react-icons/md";
import { RootState } from "../../redux/store";
import { SearchVariables } from "../../types/types";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  const initialValues: SearchVariables = {
    destination: destination,
    checkIn: checkIn,
    checkOut: checkOut,
    adultCount: adultCount,
    childCount: childCount,
  };

  const submitHandler = (values: SearchVariables) => {
    // console.log("submitHandler ~ values:", values);
    dispatch(setDestination(values.destination));
    dispatch(setAdultCount(values.adultCount));
    dispatch(setChildCount(values.childCount));
    dispatch(setCheckIn(values.checkIn));
    dispatch(setCheckOut(values.checkOut));

    location.pathname !== "/search" && navigate("/search");
  };
  const clearHandler = () => {
    dispatch(setDestination(""));
    dispatch(setAdultCount(1));
    dispatch(setChildCount(0));
    dispatch(setCheckOut(new Date()));
    dispatch(setCheckIn(new Date()));
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1); // 1 year from now
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      enableReinitialize={true}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
          <div className="flex flex-row items-center flex-1 bg-white p-2">
            <MdTravelExplore size={25} className="mr-2" />
            <Field
              placeholder="Where are you going?"
              className="text-md w-full focus:outline-none"
              name="destination"
              type="text"
              // value={values.destination}
            />
          </div>

          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex flex-1" htmlFor="adultCount">
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
            <label className="items-center flex flex-1" htmlFor="childCount">
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

          <div className="flex gap-1">
            <button
              type="submit"
              className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500"
            >
              Search
            </button>
            <button
              className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500"
              type="button"
              onClick={() => {
                clearHandler();
                resetForm();
              }}
            >
              Clear
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
