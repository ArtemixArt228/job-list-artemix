import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import {
  getAllJobs,
  saveJob,
  unSaveJob,
  changeRating,
} from "../redux/features/jobsSlice";

const actions = {
  getAllJobs,
  saveJob,
  unSaveJob,
  changeRating,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
