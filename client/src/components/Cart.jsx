import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { btnClick, slideIn, staggerFadeInOut } from "../animations";
import { setCartOff } from "../app/slices/showCartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FcClearFilters,
  BiChevronsRight,
  HiCurrencyRupee,
} from "../assets/icons";
import { getAllCartItems, increaseItemQuantity } from "../api";
import { alertNULL, alertSuccess } from "../app/slices/alertSlice";
import { setCartItems } from "../app/slices/cartSlice";
import { emptyCart } from "../assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let tot = 0;
    if (cartItems) {
      cartItems.map((data) => {
        tot = tot + data.product_price * data.quantity;
        setTotal(tot);
      });
    }
  }, [cartItems]);

  const handleCheckOut = () => {
    dispatch(setCartOff());
    navigate("/checkout");
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-300 md:w-460 bg-lightOverlay backdrop-blur-md shadow-md h-full"
    >
      <div className="flex-1 flex flex-col items-start justify-start bg-zinc-700 h-full p-4 gap-3 relative">
        <div className="w-full flex items-center justify-between p-2 bg-lightOverlay ">
          <motion.i
            {...btnClick}
            className="cursor-pointer"
            onClick={() => dispatch(setCartOff())}
          >
            <BiChevronsRight className="text-[50px] text-white" />
          </motion.i>
          <p className="text-xl text-white font-semibold">My Cart</p>
          <motion.i {...btnClick} className="cursor-pointer">
            <FcClearFilters className="text-[30px] text-textColor" />
          </motion.i>
        </div>
        {cartItems && cartItems?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[70%] overflow-y-scroll scrollbar-none">
              {cartItems &&
                cartItems?.length > 0 &&
                cartItems?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>

            <div className="bg-zinc-800 w-full h-[30%] flex flex-col items-center justify-center px-4 py-6 gap-4">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                  <HiCurrencyRupee className="text-primary" />
                  {total}
                </p>
              </div>

              <motion.button
                {...btnClick}
                className="bg-emerald-400 w-[70%] px-4 py-3 text-xl text-white font-semibold hover:bg-emerald-500 drop-shadow-md rounded-2xl"
                onClick={handleCheckOut}
              >
                Check Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl text-orange-500 mx-auto my-2 font-bold">
              Cart is Empty!
            </h1>
            <div className="w-full h-full">
              <img
                src={emptyCart}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartitem"));
    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartitem"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4 gap-4"
    >
      <img
        src={data?.imageURL}
        className=" w-24 min-w-[94px] h-24 object-contain"
        alt=""
      />

      <div className="flex items-center justify-start gap-1 w-full">
        <p className="text-lg text-primary font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-gray-400">
            {data?.product_category}
          </span>
        </p>
        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-400 ml-auto">
          <HiCurrencyRupee className="text-red-400" /> {itemTotal}
        </p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...btnClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">--</p>
        </motion.div>
        <p className="text-lg text-primary font-semibold">{data?.quantity}</p>
        <motion.div
          {...btnClick}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
          onClick={() => incrementCart(data?.productId)}
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
