import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      console.log(payload);
    },
    logout: (state) => {
      state.user = null;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refresh_token");
    },
  },
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;
