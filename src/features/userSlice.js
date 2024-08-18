import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../utils/axiosClient";

const initialState = {
  user: null,
  pending: false,
};

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const user = await axiosClient.post("/auth/get-user", {
    access_token: window.localStorage.getItem("token"),
  });

  return user.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      window.localStorage.setItem("token", payload.access_token);
      window.localStorage.setItem("refresh_token", payload.refresh_token);
    },
    logout: (state) => {
      state.user = null;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refresh_token");
    },
    setProducts: (state, {payload})=>{
      state.products = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkUser.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(checkUser.fulfilled, (state, {payload}) => {
      state.user = payload;
      state.pending = false;
    });
    builder.addCase(checkUser.rejected, (state, {payload}) => {
     console.log(payload);
      state.pending = false;
    });
  }
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
