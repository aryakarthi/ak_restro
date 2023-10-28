import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "../assets/css/swiperStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { SliderCard } from "../components";

const Slider = () => {
  const products = useSelector((data) => data.products);
  // const clonedProducts = products?.map((prod) => ({ ...prod }));

  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
  }, [products]);

  return (
    <div className="w-full mx-auto">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {fruits &&
          fruits.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
