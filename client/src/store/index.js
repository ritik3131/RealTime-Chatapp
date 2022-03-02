import { configureStore, createSlice } from "@reduxjs/toolkit";
const { createStore } = require("redux");

const initialUserState = { name: "", isAuth: false, mailId: "" };
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.name = "";
      state.mailId = "";
    },
    login(state, action) {
      state.isAuth = action.payload.isAuth;
      state.name = action.payload.name;
      state.mailId = action.payload.mailId;
    },
  },
});

const store = configureStore({
  reducer: { user: userSlice.reducer },
});

export const userAction = userSlice.actions;
export default store;
