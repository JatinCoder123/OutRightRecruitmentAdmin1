import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BACKEND_API_URL } from "../constant";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
  },
  reducers: {
    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      const { user } = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = user
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getUser = () => {
  return async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());

    try {
      const { data } = await axios.get(
        `${BACKEND_API_URL}/admin/get`,
        { withCredentials: true }
      );
      console.log("user", data);
      dispatch(
        userSlice.actions.loadUserSuccess({
          user: data.user,
        })
      );

      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      console.log(error);
      localStorage.setItem('displayIntro', "true")
      let message = "Something went wrong. Please try again.";

      if (error.response) {
        const status = error.response.status;
        const backendError = error.response.data?.error || "";

        switch (status) {
          case 404:
            message = null;
            break;

          case 401:
            if (backendError.includes("Invalid token")) {
              message = "Your session seems to have expired. Please sign in again.";
            } else if (backendError.includes("Unauthorized user")) {
              message = "You don’t have permission to access this area.";
            } else if (backendError.includes("email missing")) {
              message = "We couldn’t verify your session. Please log in again.";
            } else {
              message = "For security reasons, please sign in again.";
            }
            break;

          case 400:
            message = "We couldn’t complete your request. Please try again.";
            break;

          default:
            message = "Something went wrong on our side. Please try again in a moment.";
        }

      }

      dispatch(userSlice.actions.loadUserFailed(message));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(userSlice.actions.logoutRequest());
    localStorage.setItem('displayIntro', "true")

    try {
      const { data } = await axios.get(
        `${AUTH_URL}/admin/logout`,
        {
          withCredentials: true,
        }
      );

      dispatch(userSlice.actions.logoutSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
  };
};

export const clearAllUserErrors = () => {
  return async (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors);
  };
};
export const userAction = userSlice.actions;
export default userSlice.reducer;
