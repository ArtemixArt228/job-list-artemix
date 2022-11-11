import React from "react";

import { usePagination, DOTS } from "../hooks/usePagination";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface IProps {
  onPageChange: Function;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = (props: IProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  return (
    <ul className="h-[52px] flex items-center md:gap-12 gap-6 justify-between text-[21px] font-bold">
      {/* Left navigation arrow */}
      <li
        onClick={onPrevious}
        className={`flex items-center px-[25px] h-[30px] border-r-2 text-[#7D859C] ${
          currentPage === 1 ? "pointer-events-none" : "cursor-pointer"
        }`}
      >
        <FiChevronLeft className="text-3xl max-[380px]:text-[18px]" />
      </li>
      <div className="flex gap-4 text-[21px] text-[#70778B] font-bold h-full">
        {paginationRange?.map((pageNumber, index) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              className={`${
                index + 1 === currentPage &&
                "text-[#5876C5] border-b-4 border-[#5876C5]"
              } cursor-pointer  w-[20px] text-center mt-[10px]`}
              key={index}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </div>

      {/*  Right Navigation arrow */}
      <li
        onClick={onNext}
        className={`flex items-center px-[25px] h-[30px] border-l-2 text-[#7D859C] ${
          currentPage === lastPage ? "pointer-events-none" : "cursor-pointer"
        }`}
      >
        <FiChevronRight className="text-3xl max-[380px]:text-[18px]" />
      </li>
    </ul>
  );
};

export default Pagination;
