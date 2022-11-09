import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobs, ILocation } from "../../models/jobs";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.json-generator.com/templates/ZM1r0eic3XEy/",
  }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<IJobs<ILocation>[], void>({
      query: () => "data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu",
      providesTags: ["Jobs"],
    }),
    getJob: builder.query<IJobs<ILocation>, string>({
      query: (id) =>
        `/${id}?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu`,
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useGetJobsQuery, useGetJobQuery } = jobsApi;
