import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllUsers } from "../api";
import { setAllProducts } from "../app/slices/productSlice";
import { setAllUsers } from "../app/slices/allUsersSlice";
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((data) => data.products);
  const clonedProducts = products?.map((prod) => ({ ...prod }));
  // console.log(clonedProducts);
  const  allUsers  = useSelector((data) => data.allUsers);

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

  return (
    <div className="w-full h-full flex items-center justify-center flex-col pt-6">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
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
                  "Paid",
                  "Not Paid",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#51FF00",
                      "#00B6FF",
                      "#008BFF",
                      "#FFD100",
                      "#FF00FB",
                    ],
                    data: [140, 90, 20, 70, 50],
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
