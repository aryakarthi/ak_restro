import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Checkout, Dashboard, Login, Main } from "./containers";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { setUserDetails } from "./app/slices/userSlice";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import { Alert, MainLoader, OrderSuccess, UserOrders } from "./components";
import { setCartItems } from "./app/slices/cartSlice";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const alert = useSelector((data) => data.alert);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center ">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/user-orders" element={<UserOrders />} />
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
