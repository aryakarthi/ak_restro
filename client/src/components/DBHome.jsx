import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../app/slices/productSlice";

const DBHome = () => {
  const { products } = useSelector((data) => data.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        console.log(data);
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return <div>DBHome</div>;
};

export default DBHome;
