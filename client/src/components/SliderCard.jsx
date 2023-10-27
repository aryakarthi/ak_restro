import React from "react";
import { motion } from "framer-motion";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { btnClick } from "../animations";
import { useDispatch, useSelector } from "react-redux";
import {
  alertNULL,
  alertSuccess,
  alertWarning,
} from "../app/slices/alertSlice";
import { addNewItemToCart, getAllCartItems } from "../api";
import { setCartItems } from "../app/slices/cartSlice";

const SliderCard = ({ data, index }) => {
  const user = useSelector((data) => data.user);
  console.log(user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    if (user) {
      addNewItemToCart(user?.user_id, data).then((res) => {
        getAllCartItems(user?.user_id).then((items) => {
          console.log(items);
          dispatch(setCartItems(items));
          dispatch(alertSuccess("Added to the cart"));
        });
        setInterval(() => {
          dispatch(alertNULL());
        }, 3000);
      });
    } else {
      dispatch(alertWarning("Please login first!"));
      setInterval(() => {
        dispatch(alertNULL());
      }, 2000);
    }
  };

  return (
    <div className="bg-lightOverlay hover:drop-shadow-xl backdrop-blur-md rounded-xl flex flex-col items-center relative p-4 w-full md:max-w-[300px] md:min-w-[275px] gap-2 group">
      <motion.div
        {...btnClick}
        onClick={sendToCart}
        className="w-8 h-8 z-50 rounded-full bg-red-500 absolute top-2 cursor-pointer right-0 opacity-0 group-hover:right-2 group-hover:opacity-100 transition-all"
      >
        <IoBasket className="text-2xl text-primary m-1" />
      </motion.div>
      <motion.img
        // whileHover={{ scale: 1.2 }}
        src={data.imageURL}
        className="w-full h-36 object-contain group-hover:scale-125 transition-all"
        alt=""
      />
      <div className="relative pt-4">
        <p className="text-xl text-headingColor font-semibold">
          {data.product_name}
        </p>
        <p className="text-lg font-semibold text-red-500 flex items-center justify-center gap-1">
          <HiCurrencyRupee className="text-red-500" />{" "}
          {parseFloat(data.product_price).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SliderCard;
