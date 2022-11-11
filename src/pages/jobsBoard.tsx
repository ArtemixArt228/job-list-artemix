import React, { useCallback, useEffect, useState } from "react";

import { useGetJobsQuery } from "../redux/services/jobs";

import JobCard from "../components/jobCard";

import { IJobs, ILocation } from "../models/jobs";

import Pagination from "../components/pagination";
import { useActions } from "../hooks/actions";

import { LS_JOBS_KEY } from "../redux/features/jobsSlice";
import { useAppSelector } from "../hooks/redux";

const PageSize = 10;

const JobsBoard = () => {
  const jobs = useAppSelector((store) => store.jobs?.jobsList);

  const [currentPage, setCurrentPage] = useState(1);

  const { getAllJobs } = useActions();

  const { data, isLoading, isError } = useGetJobsQuery();

  useEffect(() => {
    console.log(data);
    if (!JSON.parse(localStorage.getItem(LS_JOBS_KEY) as string) && data) {
      console.log("done");
      getAllJobs(
        data?.map((job) => ({
          ...job,
          rating: 0,
          saved: false,
        })) as IJobs<ILocation>[]
      );
    }
  }, [isLoading]);

  useEffect(() => {
    currentTableData();
  }, [currentPage]);

  const currentTableData = () => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return jobs?.slice(firstPageIndex, lastPageIndex);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] grid place-items-center text-gray-500 text-3xl p-4 text-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[100vh] grid place-items-center text-red-900 text-3xl p-4 text-center">
        Ooops... There is some errors. Try again later, please!
      </div>
    );
  }

  return (
    <main className="bg-[#E6E9F2] py-[25px]">
      <div className="max-w-[1440px] px-[20px] m-auto">
        {currentTableData()?.map((job: IJobs<ILocation>, i: number) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      <div className="mt-[50px] mb-[30px] px-1 bg-white max-w-[515px] max-[425px]:w-[300px] m-auto rounded-[8px]">
        <Pagination
          currentPage={currentPage}
          totalCount={data!.length}
          pageSize={PageSize}
          onPageChange={(page: number) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </main>
  );
};

export default JobsBoard;
