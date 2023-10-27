import React from "react";
import { motion } from "framer-motion";
import { delivery, heroBg } from "../assets";
import { btnClick, staggerFadeInOut } from "../animations";
import { randomData } from "../utils/styles";

const Home = () => {
  return (
    <>
      <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
        <div className="flex flex-col items-start justify-start gap-6">
          <div className="pl-4 pr-1 py-1 flex items-center justify-center gap-2 bg-blue-100 rounded-full">
            <p className="text-lg font-semibold text-blue-500">Fast Delivery</p>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
              <img
                src={delivery}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <p className="text-[36px] text-headingColor md:text-[60px] font-sans font-extrabold ">
            The Fastest Delivery in{" "}
            <span className="text-red-500">Your City</span>
          </p>

          <p className="text-textColor text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsam
            doloribus et similique distinctio, rem deleniti ipsa, nesciunt vitae
            labore voluptates sunt ducimus mollitia id libero! Nostrum expedita
            libero recusandae?
          </p>
          <motion.button
            {...btnClick}
            className="bg-gradient-to-bl from-red-400 to-red-600 px-4 py-2 rounded-xl text-white text-base font-semibold"
          >
            Order Now
          </motion.button>
        </div>

        <div className="py-2 flex-1 flex items-end justify-center relative">
          {/* <img
          className="absolute top-0 right-0 md:right-0 w-auto h-420 md:h-650"
          src={heroBg}
          alt=""
        /> */}

          <div className="w-full md:w-460 flex flex-wrap items-center justify-center gap-5 gap-y-16">
            {randomData &&
              randomData.map((data, i) => (
                <motion.div
                  key={data.id}
                  {...staggerFadeInOut(data.id)}
                  className=" w-32 h-36 md:h-auto  md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={data.imageURL}
                    className="w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain "
                    alt=""
                  />
                  {/* <p className="text-sm lg:text-xl font-semibold text-textColor">
                  {data.product_name.slice(0, 14)}
                </p> */}

                  <p className="text-[12px] text-center  md:text-base text-lighttextGray font-semibold  capitalize mt-4">
                    {data.product_category}
                  </p>

                  {/* <p className="text-sm  font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>{" "}
                  {data.product_price}
                </p> */}
                </motion.div>
              ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
