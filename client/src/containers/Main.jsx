import React, { useEffect } from "react";
import {
  Cart,
  FilterProducts,
  Header,
  Home,
  HomeSlider,
  Text,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../app/slices/productSlice";

const Main = () => {
  // const states = useSelector((state) => state);
  // console.log(states);
  const products = useSelector((state) => state.products);
  console.log(products);
  const showCart = useSelector((state) => state.showCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <main className="w-screen min-h-screen bg-slate-300">
      <Header />
      <div className="w-full px-4 lg:px-36 md:px-24 gap-12 my-28 lg:my-36 md:my-32">
        <Home />
        <HomeSlider />
        <FilterProducts />
      </div>
      {showCart && <Cart />}
    </main>
  );
};

export default Main;
