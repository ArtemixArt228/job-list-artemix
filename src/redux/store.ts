import { configureStore } from "@reduxjs/toolkit";

import { jobsApi } from "./services/jobs";
import { setupListeners } from "@reduxjs/toolkit/query";

import jobsReducer from "./features/jobsSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
