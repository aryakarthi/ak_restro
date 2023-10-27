import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: null,
  // {cartItems: null,},
  reducers: {
    setOrders: (state, action) => {
      return action.payload;
    },
    getOrders: (state) => {
      return state;
    },
  },
});

export const { setOrders, getOrders } = orderSlice.actions;

export default orderSlice.reducer;
