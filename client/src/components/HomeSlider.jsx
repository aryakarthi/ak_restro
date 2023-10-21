import React from "react";
import { motion } from "framer-motion";
import { Slider } from "../components";
import { slideTop } from "../animations";

const HomeSlider = () => {
  return (
    <>
      <motion.div {...slideTop} className="w-full my-10 p-2">
        <div className=" flex flex-col gap-1 mb-5">
          <p className="text-2xl text-headingColor font-bold">
            Our Fresh Fruits
          </p>
          <div className="w-40 h-1 rounded-md bg-red-400"></div>
        </div>
        <Slider />
      </motion.div>
    </>
  );
};

export default HomeSlider;
