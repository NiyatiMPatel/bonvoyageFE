import { AiFillStar } from "react-icons/ai";
import BookNowForm from "../../components/hotel/BookNowForm";
import { HotelDetailsProps } from "../../types/types";

const HotelDetail = ({ data }: HotelDetailsProps) => {
  console.log("HotelDetail ~ data:", data);
  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: data.starRating }).map((_, i) => (
            <AiFillStar className="fill-yellow-400" key={i} />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{data.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.imageUrls?.map((image, i) => (
          <div className="h-[300px]" key={i}>
            <img
              loading="lazy"
              src={image}
              alt={data.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {data?.facilities?.map((facility) => (
          <div
            className="border border-slate-300 rounded-sm p-3"
            key={facility}
          >
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <div className="whitespace-pre-line">{data.description}</div>
        <div className="h-fit">
          <BookNowForm pricePerNight={data.pricePerNight} hotelId={data._id} />
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
