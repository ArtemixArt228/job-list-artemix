import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useGetJobsQuery } from "../redux/services/jobs";

import { IJobs, ILocation } from "../models/jobs";

import { BsBookmark, BsShareFill } from "react-icons/bs";
import { timeSince } from "../utils/helpers";
import ApplyBtn from "../components/applyBtn";

const JobDetailed = () => {
  const [job, setJob] = useState<IJobs<ILocation>>({} as IJobs<ILocation>);

  const { id } = useParams();

  const { data: jobs, isLoading, isError } = useGetJobsQuery();

  const findProperJob = (id: string) => {
    const jobsId = jobs?.map((job: IJobs<ILocation>) => job.id);

    const indexOfJob = jobsId?.indexOf(id);

    if (indexOfJob && jobs) setJob(jobs[indexOfJob]);
  };

  useEffect(() => {
    findProperJob(id as string);
  }, [isLoading]);

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
    <div className="bg-white flex gap-[115px]">
      <div className="max-w-[1350px] m-auto my-[56px]">
        <main>
          <div className="w-[725px] flex flex-col">
            <header className="flex justify-between items-center pb-[9px] border-b border-[#3A4562]">
              <h3>JobDetails</h3>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <BsBookmark />
                  <p>Save to my list</p>
                </div>
                <div className="flex items-center gap-4">
                  <BsShareFill />
                  <p>Share</p>
                </div>
              </div>
            </header>
            <ApplyBtn />
            <div className="mt-[32px] flex justify-between">
              <h2 className="max-w-[501px]">{job.title}</h2>
              <div>
                <p>{job.salary}</p>
                <p>Dollars, per year</p>
              </div>
            </div>
            <p className="mt-2">Posted {timeSince(job.createdAt)} ago</p>
            <div>
              <p>{job.description}</p>
            </div>
            <ApplyBtn />
          </div>
        </main>
        <aside></aside>
      </div>
    </div>
  );
};

export default JobDetailed;
