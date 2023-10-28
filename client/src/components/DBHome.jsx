import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllProducts, getAllUsers } from "../api";
import { setAllProducts } from "../app/slices/productSlice";
import { setAllUsers } from "../app/slices/allUsersSlice";
import { setOrders } from "../app/slices/orderSlice";
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((data) => data.products);
  const clonedProducts = products?.map((prod) => ({ ...prod }));

  const allUsers = useSelector((data) => data.allUsers);

  const orders = useSelector((data) => data.orders);
  const clonedOrders = orders?.map((order) => ({ ...order }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUsers(data));
      });
    }
    if (!orders) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, []);

  const drinks = clonedProducts?.filter(
    (item) => item.product_category === "drinks"
  );
  const deserts = clonedProducts?.filter(
    (item) => item.product_category === "deserts"
  );
  const fruits = clonedProducts?.filter(
    (item) => item.product_category === "fruits"
  );
  const rice = clonedProducts?.filter(
    (item) => item.product_category === "rice"
  );
  const curry = clonedProducts?.filter(
    (item) => item.product_category === "curry"
  );
  const chicken = clonedProducts?.filter(
    (item) => item.product_category === "chicken"
  );
  const mutton = clonedProducts?.filter(
    (item) => item.product_category === "mutton"
  );
  const fish = clonedProducts?.filter(
    (item) => item.product_category === "fish"
  );

  const preparing = clonedOrders?.filter((item) => item.status === "preparing");
  const cancelled = clonedOrders?.filter((item) => item.status === "cancelled");
  const delivered = clonedOrders?.filter((item) => item.status === "delivered");
  const pending = clonedOrders?.filter(
    (item) => item.paymentStatus === "pending"
  );
  const paid = clonedOrders?.filter((item) => item.paymentStatus === "paid");

  return (
    <div className="w-full h-full flex items-center justify-center flex-col pt-6">
      <div className="w-full h-full grid gap-16">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "Drinks",
                  "Deserts",
                  "Fruits",
                  "Rice",
                  "Curry",
                  "Chicken",
                  "Mutton",
                  "Fish",
                ],
                datasets: [
                  {
                    label: "Category wise Count",
                    backgroundColor: "#f87979",
                    data: [
                      drinks?.length,
                      deserts?.length,
                      fruits?.length,
                      rice?.length,
                      curry?.length,
                      chicken?.length,
                      mutton?.length,
                      fish?.length,
                    ],
                  },
                ],
              }}
              labels="numbers"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Orders",
                  "Delivered",
                  "Cancelled",
                  "Preparing",
                  "Pending",
                  "Paid",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#0101FF",
                      "#50C878",
                      "#FF4433",
                      "#FFC300",
                      "#E25E3E",
                      "#6527BE",
                    ],
                    data: [
                      clonedOrders?.length,
                      delivered?.length,
                      cancelled?.length,
                      preparing?.length,
                      pending?.length,
                      paid?.length,
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
