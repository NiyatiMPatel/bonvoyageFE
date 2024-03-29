import { ErrorMessage, Field, useFormikContext } from "formik";
import { HotelFormData } from "../../types/types";
const GuestsSection = () => {
  const { errors, touched } = useFormikContext<HotelFormData>();

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label
          className="text-gray-700 text-sm font-semibold"
          htmlFor="adultCount"
        >
          Adults
          <Field
            id="adultCount"
            name="adultCount"
            className={`${
              errors.adultCount && touched.adultCount
                ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
                : "border rounded w-full py-1 px-2 font-normal"
            }`}
            type="number"
            min={0}
          />
          <ErrorMessage
            className="text-red-500"
            name="adultCount"
            component="div"
          />
        </label>
        <label
          className="text-gray-700 text-sm font-semibold"
          htmlFor="childCount"
        >
          Children
          <Field
            id="childCount"
            name="childCount"
            className={`${
              errors.childCount && touched.childCount
                ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
                : "border rounded w-full py-1 px-2 font-normal"
            }`}
            type="number"
            min={0}
          />
          <ErrorMessage
            className="text-red-500"
            name="childCount"
            component="div"
          />
        </label>
      </div>
    </>
  );
};

export default GuestsSection;
