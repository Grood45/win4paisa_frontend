import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Cookies from "universal-cookie";
import axios from "axios";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";

const cookies = new Cookies();
export const setUserCookie = (name: string, value: any, options?: any) => {
  cookies.set(name, value, options);
};

export const getUserCookie = (name: string): any => {
  return cookies.get(name);
};

export const removeUserCookie = (name: string, options?: any) => {
  cookies.remove(name, options);
};

interface AuthState {
  token: string | null;
  loading: boolean;
  message: string | null;
  error: string | null;
  data: any | null;
  fetchLoading: boolean;
  fetchError: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  fetchLoading: false,
  fetchError: null,
  message: "",
  data: getUserCookie("userData") || {},
  error: null,
};

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`; // Replace this with your API base URL

export const loginAsync = createAsyncThunk(
  "userlogin",
  async (credentials: {
    email: String;
    username:String,
    first_name: String;
    last_name: String;
    phone: String;
    otpless_token: String;
    type:String
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/google-login`,
        credentials
      );
      
      return response.data;
    } catch (error: any) {
      // Handle authentication errors here, if any
      return error.response.data;
    }
  }
);

export const updateUserDataAsync = createAsyncThunk(
  "user/updateUserData",
  async (updatedData: any) => {
    try {
      const response = await sendPatchRequest(
        `${API_BASE_URL}/api/user/update-single-user`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserDataAsync = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const data = getUserCookie("userData");
    try {
      const response = await fetchGetRequest(
        `${API_BASE_URL}/api/user/get-single-user/${data.user.user_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const removeUserDataAsync = createAsyncThunk("user/logout", async () => {
  removeUserCookie("userData");
  return true;
});

export const authSlice = createSlice({
  name: "userauth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null; // Reset message on pending
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action?.payload?.data?.token;
        state.message = action?.payload?.message; // Set the message from the payload
        state.data = action?.payload;
        setUserCookie("userData", action.payload, { path: "/" });
        // Cookies.set("token", action.payload.token); // Save token in cookie
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
        state.message = null; // Reset message on rejection
      })
      .addCase(updateUserDataAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        setUserCookie("userData", action.payload, { path: "/" });
      })
      .addCase(updateUserDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Update failed";
      })
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        state.fetchLoading = false;
        const data = {
          ...state,
          ...state.data,
          user: action.payload,
        };
        state.data = data;
        setUserCookie("userData", data, { path: "/" });
      })
      .addCase(fetchUserDataAsync.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.error.message || "Fetch failed";
      })
      .addCase(removeUserDataAsync.fulfilled, (state, action) => {
        removeUserCookie("userData");
        state.token = null;
        state.loading = false;
        state.fetchLoading = false;
        state.fetchError = null;
        state.message = "";
        state.data = {};
        state.error = null;
      });
  },
});

// export const selectUserLoginToken = (state: RootState) =>
//   state.combineR.auth.token;
// export const selectUserLoginLoading = (state: RootState) =>
//   state.combineR.auth.loading;
// export const selectUserLoginError = (state: RootState) =>
//   state.combineR.auth.error;

export default authSlice.reducer;
