import React, { useEffect, useMemo, useState } from "react";

import { useGetJobsQuery } from "../redux/services/jobs";

import JobCard from "../components/jobCard";

import { IJobs, ILocation } from "../models/jobs";

import Pagination from "../components/pagination";

const PageSize = 10;

const JobsBoard = () => {
  //const [jobs, setJobs] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetJobsQuery();

  // useEffect(() => {
  //   setJobs(data);
  // }, []);

  /*const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data!.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);*/

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
        {data?.map((job: IJobs<ILocation>) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      <div className="mt-[50px] mb-[30px] bg-white w-[515px] m-auto rounded-[8px]">
        <Pagination
          currentPage={currentPage}
          totalCount={data!.length}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </main>
  );
};

export default JobsBoard;
