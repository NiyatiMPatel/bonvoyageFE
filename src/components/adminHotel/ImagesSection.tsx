import React from "react";
import { ErrorMessage, useFormikContext } from "formik";
import { HotelFormData } from "../../types/types";

const ImagesSection = () => {
  const { values, setFieldValue } = useFormikContext<HotelFormData>();

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();

    setFieldValue(
      "imageUrls",
      values?.imageUrls?.filter((url) => url !== imageUrl)
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {values?.imageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {values?.imageUrls.map((url) => (
              <div className="relative group" key={url}>
                <img
                  src={url}
                  className="min-h-full object-cover"
                  alt={url}
                  loading="lazy"
                />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          id="imageFiles"
          className="w-full text-gray-700 font-normal"
          type="file"
          name="imageFiles"
          multiple
          accept="image/*"
          onChange={(event: any) => {
            console.log("ImagesSection ~ event", event);
            const files = event.target.files;
            setFieldValue("imageFiles", files);
          }}
          // disabled={values.imageFiles.length >= 6}
        />
      </div>
      <ErrorMessage
        className="text-red-500"
        name="imageFiles"
        component="div"
      />
    </>
  );
};

export default ImagesSection;
