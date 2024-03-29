import { ErrorMessage, Field, useFormikContext } from "formik";
import { HotelFormData } from "../../types/types";

const DetailsSection = () => {
  const { errors, touched } = useFormikContext<HotelFormData>();
  return (
    // <div className="flex flex-col gap-4">
    //   <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
    <>
      <label htmlFor="name" className="text-gray-700 text-sm font-bold flex-1">
        Name
        <Field
          id="name"
          className={`${
            errors.name && touched.name
              ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
              : "border rounded w-full py-1 px-2 font-normal"
          }`}
          type="text"
          name="name"
        />
        <ErrorMessage className="text-red-500" name="name" component="div" />
      </label>

      <div className="flex gap-4">
        <label
          htmlFor="city"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          City
          <Field
            id="city"
            className={`${
              errors.city && touched.city
                ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
                : "border rounded w-full py-1 px-2 font-normal"
            }`}
            type="text"
            name="city"
          />
          <ErrorMessage className="text-red-500" name="city" component="div" />
        </label>
        <label
          htmlFor="country"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Country
          <Field
            id="country"
            className={`${
              errors.country && touched.country
                ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
                : "border rounded w-full py-1 px-2 font-normal"
            }`}
            type="text"
            name="country"
          />
          <ErrorMessage
            className="text-red-500"
            name="country"
            component="div"
          />
        </label>
      </div>
      <label
        htmlFor="description"
        className="text-gray-700 text-sm font-bold flex-1"
      >
        Description
        <Field
          id="description"
          className={`${
            errors.description && touched.description
              ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
              : "border rounded w-full py-1 px-2 font-normal"
          }`}
          as="textarea"
          rows={10}
          name="description"
        />
        <ErrorMessage
          className="text-red-500"
          name="description"
          component="div"
        />
      </label>
      <label
        htmlFor="pricePerNight"
        className="text-gray-700 text-sm font-bold max-w-[50%]"
      >
        Price Per Night
        <Field
          id="pricePerNight"
          className={`${
            errors.pricePerNight && touched.pricePerNight
              ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
              : "border rounded w-full py-1 px-2 font-normal"
          }`}
          type="number"
          name="pricePerNight"
        />
        <ErrorMessage
          className="text-red-500"
          name="pricePerNight"
          component="div"
        />
      </label>
      <label
        htmlFor="starRating"
        className="text-gray-700 text-sm font-bold max-w-[50%]"
      >
        Star Rating
        <Field
          as="select"
          id="starRating"
          name="starRating"
          className={`${
            errors.starRating && touched.starRating
              ? "border border-rose-600 rounded w-full py-1 px-2 font-normal"
              : "border rounded w-full py-1 px-2 font-normal"
          }`}
        >
          {[1, 2, 3, 4, 5].map((option) => {
            return (
              <option key={+option} value={+option}>
                {+option}
              </option>
            );
          })}
        </Field>
        <ErrorMessage
          className="text-red-500"
          name="starRating"
          component="div"
        />
      </label>
    </>
    // </div
  );
};

export default DetailsSection;
