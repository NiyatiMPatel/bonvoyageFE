import { PriceProps } from "../../types/types";

const PriceFilter = ({ selectedPrice, onChange }: PriceProps) => {
  const startNumber = 100;
  const endNumber = 3000;
  const step = 100;

  const priceRangeArray = Array.from(
    { length: (endNumber - startNumber) / step + 1 },
    (_, index) => startNumber + index * step
  );
  return (
    <div>
      <h4 className="text-md font-semibold mb-2"> Max Price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {priceRangeArray.map((price) => (
          <option value={price} key={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
