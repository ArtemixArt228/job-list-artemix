import React from "react";
import { useGetJobsQuery } from "../redux/services/jobs";
import JobCard from "../components/jobCard";
import { IJobs, ILocation } from "../models/jobs";

const JobsBoard = () => {
  const { data: jobs, isLoading, isError } = useGetJobsQuery();
  console.log(jobs);
  if (isLoading) {
    return (
      <div className="w-full h-[100vh] grid place-items-center text-gray-500 text-3xl">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[100vh] grid place-items-center text-red-900 text-3xl">
        Ooops... There is some errors. Try again later, please
      </div>
    );
  }

  return (
    <main className="bg-[#E6E9F2] py-[25px]">
      <div className="w-[1440px] px-[20px] m-auto">
        {jobs?.map((job: IJobs<ILocation>) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </main>
  );
};

export default JobsBoard;
