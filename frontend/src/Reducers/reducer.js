import { createReducer } from "@reduxjs/toolkit";

const intitialState = {};
export const dashboardDataReducer = createReducer(intitialState, {
  dashboardDataRequest: (state) => {
    return {
      ...state,
      loading: true,
    };
  },
  dashboardDataSuccess: (state, action) => {
    return {
      ...state,
      loading: false,
      datadetails: action.payload,
    };
  },
  dashboardDataFailure: (state, action) => {
    return {
      ...state,
      loading: false,
      datadetails: action.payload,
    };
  },
});
