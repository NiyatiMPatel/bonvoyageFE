import { ErrorMessage, Field, useField } from "formik";
import { hotelFacilities } from "../../dummy/hotelOptions";

const FacilitiesSection = () => {
  const [field] = useField("facilities");
  const selectedValue = field.value;
  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            htmlFor={facility}
            className="text-sm flex gap-1 text-gray-700"
          >
            <Field
              type="checkbox"
              name="facilities"
              id={facility}
              value={facility}
              checked={selectedValue.includes(facility)}
            />
            {facility}
          </label>
        ))}
      </div>
      <ErrorMessage
        className="text-red-500"
        name="facilities"
        component="div"
      />
    </>
  );
};

export default FacilitiesSection;
