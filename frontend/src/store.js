import { configureStore } from "@reduxjs/toolkit";
import { dashboardDataReducer } from "./Reducers/reducer.js";

const store = configureStore({
  reducer: {
    dashboardData: dashboardDataReducer,
  },
});
export default store;
