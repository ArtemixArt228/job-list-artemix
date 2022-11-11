import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJobs, ILocation } from "../../models/jobs";

export const LS_JOBS_KEY: string = "jobs_list";

interface IJobsList {
  jobsList: IJobs<ILocation>[];
}

const initialState: IJobsList = {
  jobsList: JSON.parse(localStorage.getItem(LS_JOBS_KEY) ?? "[]"),
};

export const counterSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    getAllJobs: (state, action: PayloadAction<IJobs<ILocation>[]>) => {
      state.jobsList = action.payload;
      localStorage.setItem(LS_JOBS_KEY, JSON.stringify(action.payload));
    },
    saveJob: (state, action: PayloadAction<string>) => {
      const arr: IJobs<ILocation>[] = state.jobsList.map((job) =>
        job.id === action.payload ? { ...job, saved: true } : job
      ) as IJobs<ILocation>[];
      state.jobsList = arr;
      localStorage.setItem(LS_JOBS_KEY, JSON.stringify(arr));
    },
    unSaveJob: (state, action: PayloadAction<string>) => {
      const arr: IJobs<ILocation>[] = state.jobsList.map((job) =>
        job.id === action.payload ? { ...job, saved: false } : job
      ) as IJobs<ILocation>[];
      state.jobsList = arr;
      localStorage.setItem(LS_JOBS_KEY, JSON.stringify(arr));
    },
    changeRating: (
      state,
      action: PayloadAction<{ id: string; rating: number }>
    ) => {
      const arr: IJobs<ILocation>[] = state.jobsList.map((job) =>
        job.id === action.payload.id
          ? { ...job, rating: action.payload.rating }
          : job
      ) as IJobs<ILocation>[];
      state.jobsList = arr;
      localStorage.setItem(LS_JOBS_KEY, JSON.stringify(arr));
    },
  },
});

export const { getAllJobs, unSaveJob, saveJob, changeRating } =
  counterSlice.actions;

export default counterSlice.reducer;
