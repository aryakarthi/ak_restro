import React, { useEffect } from "react";
import { Cart, FilterProducts, Header, Home, HomeSlider,Text } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../app/slices/productSlice";

const Main = () => {
  const { products } = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.showCart);
  console.log(isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <main className="w-screen min-h-screen bg-zinc-300">
      <Header />
      <div className="w-full px-4 lg:px-36 md:px-24 gap-12 my-28 lg:my-36 md:my-32">
        <Home />
        <HomeSlider />
        <FilterProducts />
      </div>
      {isCart && <Cart/>}
    </main>
  );
};

export default Main;
