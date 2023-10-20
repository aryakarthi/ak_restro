import React from "react";
import { motion } from "framer-motion";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { btnClick } from "../animations";
import { useDispatch, useSelector } from "react-redux";
import { alertNULL, alertSuccess } from "../app/slices/alertSlice";
import { addNewItemToCart, getAllCartItems } from "../api";
import { setCartItems } from "../app/slices/cartSlice";

const SliderCard = ({ data, index }) => {
  const user = useSelector((data) => data.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    dispatch(alertSuccess("Added to the cart"));
    addNewItemToCart(user?.user_id, data).then((res) => {
      getAllCartItems(user?.user_id).then((items) => {
        console.log(items);
        dispatch(setCartItems(items));
      });
      setInterval(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  return (
    <div className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex flex-col items-center relative p-4 w-full md:max-w-[300px] md:min-w-[275px] gap-2">
      <motion.div
        {...btnClick}
        onClick={sendToCart}
        className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute top-4 right-4 cursor-pointer"
      >
        <IoBasket className="text-2xl text-primary" />
      </motion.div>
      <motion.img
        whileHover={{ scale: 1.2 }}
        src={data.imageURL}
        className="w-36 h-36 object-contain"
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
