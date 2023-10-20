import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import alertSlice from "./slices/alertSlice";
import productSlice from "./slices/productSlice";
import allUsersSlice from "./slices/allUsersSlice";
import cartSlice from "./slices/cartSlice";
import showCartSlice from "./slices/showCartSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    alert: alertSlice,
    products: productSlice,
    allUsers: allUsersSlice,
    cartItems: cartSlice,
    showCart: showCartSlice,
  },
});
