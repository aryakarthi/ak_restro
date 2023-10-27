import React from "react";
import { motion } from "framer-motion";
import { btnClick, staggerFadeInOut } from "../animations";
import { useDispatch } from "react-redux";
import { HiCurrencyRupee } from "../assets/icons";
import { getAllOrders, updateOrderStatus, updatePayStatus } from "../api";
import { setOrders } from "../app/slices/orderSlice";

const OrderData = ({ index, data, admin }) => {
  const dispatch = useDispatch();

  const handleStatus = (orderId, status) => {
    updateOrderStatus(orderId, status).then((response) => {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };

  const handlePayStatus = (orderId, payStatus) => {
    updatePayStatus(orderId, payStatus).then((response) => {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };

  return (
    <motion.div
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-4 mb-4"
    >
      <div className="w-full flex items-start justify-between">
        <div className="flex items-start justify-start flex-col gap-2 px-2 w-[50%]">
          <h1 className="text-lg text-headingColor font-semibold">
            {data.shippingDetails.customerName}
          </h1>

          <p className="text-base text-headingColor -mt-2">
            {data.shippingDetails.email} {data.shippingDetails.mobile}
          </p>

          <p className="text-base text-textColor -mt-2">
            {data.shippingDetails.address.street},
            {data.shippingDetails.address.city}{" "}
            {data.shippingDetails.address.state} -
            {data.shippingDetails.address.pincode}
          </p>
        </div>
        <div className="w-[50%] flex flex-col items-end">
          <div className=" flex items-center gap-4 mb-4">
            <p className="flex items-center gap-1 text-textColor">
              Total : <HiCurrencyRupee className="text-lg text-red-500" />{" "}
              <span className="text-headingColor font-bold">
                {data?.grandTotal}
              </span>
            </p>
            {!admin && (
              <p className="text-lg font-semibold text-headingColor">
                Payment Status :
              </p>
            )}

            <p
              className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
                (data?.paymentStatus === "pending" &&
                  "text-orange-500 bg-orange-100") ||
                (data?.paymentStatus === "paid" &&
                  "text-emerald-500 bg-emerald-100")
              }`}
            >
              {data?.paymentStatus}
            </p>

            {admin && (
              <div className="flex items-center justify-center gap-2">
                <p className="text-lg font-semibold text-headingColor">
                  Payment Status
                </p>

                <motion.button
                  {...btnClick}
                  onClick={() => handlePayStatus(data.order_id, "pending")}
                  className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                >
                  Pending
                </motion.button>

                <motion.button
                  {...btnClick}
                  onClick={() => handlePayStatus(data.order_id, "paid")}
                  className={`text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                >
                  Paid
                </motion.button>
              </div>
            )}
          </div>
          <div className=" flex items-center gap-4">
            {!admin && (
              <p className="text-lg font-semibold text-headingColor">
                Order Status :
              </p>
            )}
            <p
              className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
                (data?.status === "preparing" &&
                  "text-orange-500 bg-orange-100") ||
                (data?.status === "cancelled" && "text-red-500 bg-red-100") ||
                (data?.status === "delivered" &&
                  "text-emerald-500 bg-emerald-100")
              }`}
            >
              {data?.status}
            </p>

            {admin && (
              <div className="flex items-center justify-center gap-2">
                <p className="text-lg font-semibold text-headingColor">
                  Order Status
                </p>

                <motion.button
                  {...btnClick}
                  onClick={() => handleStatus(data.order_id, "preparing")}
                  className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                >
                  Preparing
                </motion.button>

                <motion.button
                  {...btnClick}
                  onClick={() => handleStatus(data.order_id, "cancelled")}
                  className={`text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                >
                  Cancelled
                </motion.button>

                <motion.button
                  {...btnClick}
                  onClick={() => handleStatus(data.order_id, "delivered")}
                  className={`text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                >
                  Delivered
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start flex-wrap w-full">
        <div className="flex items-center justify-center gap-4">
          {data?.items &&
            data.items.map((item, j) => (
              <motion.div
                {...staggerFadeInOut(j)}
                key={j}
                className="flex items-center justify-center gap-1"
              >
                <img
                  src={item.imageURL}
                  className="w-10 h-10 object-contain"
                  alt=""
                />

                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-headingColor">
                    {item.product_name}
                  </p>
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-textColor">
                      {" "}
                      Qty : {item.quantity}
                    </p>
                    <p className="flex items-center gap-1 text-textColor">
                      <HiCurrencyRupee className="text-base text-red-500" />
                      {parseFloat(item.product_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderData;
