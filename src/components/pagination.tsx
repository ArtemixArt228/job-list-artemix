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
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  return (
    <ul className="h-[52px] flex items-center gap-12 justify-between">
      {/* Left navigation arrow */}
      <li
        onClick={onPrevious}
        className="flex items-center px-[25px] h-[30px] border-r-2"
      >
        <FiChevronLeft />
      </li>
      <div className="flex gap-4">
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
            <li key={index} onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </li>
          );
        })}
      </div>

      {/*  Right Navigation arrow */}
      <li
        onClick={onNext}
        className="flex items-center px-[25px] h-[30px] border-l-2"
      >
        <FiChevronRight />
      </li>
    </ul>
  );
};

export default Pagination;
