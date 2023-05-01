import axios from "axios";

export const DashboardDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "dashboardDataRequest",
      });
      const { data } = await axios.get(`/getalldata`, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      dispatch({ type: "dashboardDataSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "dashboardDataFailure",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "dashboardDataFailure",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};
