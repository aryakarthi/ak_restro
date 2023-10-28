import React, { useEffect, useState } from "react";
import { CheckoutInput, Header } from "../components";
import {
  BsSignpost,
  FaCity,
  FaMobileAlt,
  FaRegEnvelope,
  FaRegUser,
  SlLocationPin,
  BsPostcard,
} from "../assets/icons";

import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setOrders } from "../app/slices/orderSlice";
import { createOrder, getAllOrders } from "../api";
import { alertNULL, alertSuccess } from "../app/slices/alertSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const user = useSelector((data) => data.user);
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [subtotal, setSubTotal] = useState(0);
  const [shipCharge, setShipCharge] = useState(100);
  const gotoSuccess = useNavigate();

  useEffect(() => {
    let tot = 0;
    if (cartItems) {
      cartItems.map((data) => {
        tot = tot + data.product_price * data.quantity;
        setSubTotal(tot);
      });
    }
  }, [cartItems]);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymode, setPaymode] = useState("UPI");

  const paymodeChange = (e) => {
    setPaymode(e.target.value);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const order_id = uuidv4();
    const shippingDetails = {
      customerName,
      email,
      mobile,
      address: { street, city, state, pincode },
    };
    const checkoutData = {
      created_at: Date.now(),
      customer: user,
      items: cartItems,
      subTotal: subtotal,
      shipCharge,
      grandTotal: subtotal + shipCharge,
      paymentMode: paymode,
      paymentStatus: "pending",
      shippingDetails,
      status: "preparing",
    };

    createOrder(checkoutData).then((res) => {
      dispatch(alertSuccess("Order Placed Successfully!"));
      gotoSuccess("/order-success", { replace: true });
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
    getAllOrders().then((data) => {
      dispatch(setOrders(data));
    });
  };

  return (
    <div className="w-screen min-h-screen bg-slate-300">
      <Header className="w-full px-0" />

      <div className="w-full grid lg:grid-cols-2 px-2 md:px-40 my-20">
        <div className="w-full px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <div className="mt-8 rounded-lg border bg-gray-200 px-6 py-4 mb-2">
            {cartItems &&
              cartItems?.length > 0 &&
              cartItems?.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:items-center rounded-lg"
                >
                  <img
                    className="w-16 min-w-[64px] h-16 object-contain"
                    src={item?.imageURL}
                    alt=""
                  />
                  <div className="flex w-full flex-col pl-4 py-4 ">
                    <p className="font-bold text-lg">{item?.product_name}</p>
                    <p className="font-semibold text-md">
                      Price : Rs. {item?.product_price}
                    </p>
                    <div className="w-full flex justify-between">
                      <span className="text-md font-semibold">
                        Qty : {item?.quantity}
                      </span>
                      <span className="text-lg font-bold">
                        Rs. {item?.product_price * item?.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="rounded-lg border bg-gray-200 py-4">
            <div className="border-b py-2 px-6">
              <div className="flex items-center justify-between">
                <p className="text-md font-medium text-gray-700">Sub Total</p>
                <p className="text-lg font-semibold text-gray-900">
                  Rs. {subtotal}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-md font-medium text-gray-700">Shipping</p>
                <p className="text-lg font-semibold text-gray-900">Rs. 100</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between px-6">
              <p className="text-md font-medium text-gray-700">Grand Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                <span className="text-md font-normal text-gray-900">Rs. </span>
                {subtotal + shipCharge}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:mt-10 mt-2 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping Details</p>
          <div className="w-full mt-8">
            <form className="w-full" onSubmit={handleCheckout}>
              <div className=" rounded-md flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-12 bg-gray-200">
                <CheckoutInput
                  placeHolder={"Name"}
                  icon={<FaRegUser className="text-xl text-textColor" />}
                  inputState={customerName}
                  inputFunction={setCustomerName}
                  type="text"
                />
                <CheckoutInput
                  placeHolder={"Email"}
                  icon={<FaRegEnvelope className="text-xl text-textColor" />}
                  inputState={email}
                  inputFunction={setEmail}
                  type="email"
                />
                <CheckoutInput
                  placeHolder={"Mobile"}
                  icon={<FaMobileAlt className="text-xl text-textColor" />}
                  inputState={mobile}
                  inputFunction={setMobile}
                  type="tel"
                />
                <CheckoutInput
                  placeHolder={"Street"}
                  icon={<BsSignpost className="text-xl text-textColor" />}
                  inputState={street}
                  inputFunction={setStreet}
                  type="text"
                />
                <CheckoutInput
                  placeHolder={"City"}
                  icon={<FaCity className="text-xl text-textColor" />}
                  inputState={city}
                  inputFunction={setCity}
                  type="text"
                />
                <CheckoutInput
                  placeHolder={"State"}
                  icon={<SlLocationPin className="text-xl text-textColor" />}
                  inputState={state}
                  inputFunction={setState}
                  type="text"
                />
                <CheckoutInput
                  placeHolder={"Pincode"}
                  icon={<BsPostcard className="text-xl text-textColor" />}
                  inputState={pincode}
                  inputFunction={setPincode}
                  type="text"
                />
                <div className="w-full">
                  <p className="text-lg font-semibold mb-2">Payment Mode</p>
                  <div className="w-full flex gap-4 px-2">
                    <input
                      type="radio"
                      name="payment-mode"
                      id="cash"
                      value="Cash"
                      checked={paymode === "Cash"}
                      onChange={paymodeChange}
                    />
                    <label htmlFor="cash">Cash</label>

                    <input
                      type="radio"
                      name="payment-mode"
                      id="upi"
                      value="UPI"
                      checked={paymode === "UPI"}
                      onChange={paymodeChange}
                    />
                    <label htmlFor="upi">UPI (GPay, Phonepe, Paytm, etc)</label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
