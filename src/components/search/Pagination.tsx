import { PaginationProps } from "../../types/types";

const Pagination = ({
  // isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // page count array to display pagination bar
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      {/* {!isLoading && ( */}
      <ul className="flex border border-slate-300">
        {/* pagination bar */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 ${
              currentPage === number ? "bg-gray-200" : ""
            }`}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
      {/* )} */}
    </div>
  );
};

export default Pagination;
