import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: null,
  reducers: {
    alertSuccess(state, action) {
      return { type: "success", message: action.payload };
    },
    alertWarning(state, action) {
      return { type: "warning", message: action.payload };
    },
    alertDanger(state, action) {
      return { type: "danger", message: action.payload };
    },
    alertInfo(state, action) {
      return { type: "info", message: action.payload };
    },
    alertNULL(state, action) {
      return null;
    },
  },
});

export const { alertSuccess, alertWarning, alertDanger, alertInfo, alertNULL } =
  alertSlice.actions;

export default alertSlice.reducer;
