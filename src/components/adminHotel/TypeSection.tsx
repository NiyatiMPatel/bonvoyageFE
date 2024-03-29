import { ErrorMessage, useField } from "formik";
import { hotelTypes } from "../../dummy/hotelOptions";

const TypeSection = () => {
  const [field] = useField("type");
  const selectedValue = field.value;
  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            htmlFor={type}
            key={type}
            className={
              selectedValue === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              id={type}
              type="radio"
              name="type"
              value={type}
              className="hidden"
              checked={selectedValue === type}
              onChange={() =>
                field.onChange({ target: { value: type, name: "type" } })
              }
            />
            <span>{type}</span>
          </label>
        ))}
        <ErrorMessage className="text-red-500" name="type" component="div" />
      </div>
    </>
  );
};

export default TypeSection;
