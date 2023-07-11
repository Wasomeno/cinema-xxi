import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

export function AppBannerSlider() {
  const [showNavigation, setShowNavigation] = useState(false);
  return (
    <div
      className="swiper-container relative w-full lg:w-5/6"
      onMouseOver={() => setShowNavigation(true)}
      onMouseLeave={() => setShowNavigation(false)}
    >
      <Swiper
        className="h-40 w-full lg:h-80"
        autoplay={{ disableOnInteraction: false }}
        navigation={{ enabled: true, nextEl: ".btn-next", prevEl: ".btn-prev" }}
        modules={[Navigation, Autoplay]}
        loop={true}
        spaceBetween={50}
      >
        <SwiperSlide className="flex h-full w-full items-center justify-center shadow-sm">
          <Image
            src="https://media.21cineplex.com/webcontent/gallery/pictures/167816028263406_925x527.jpg"
            fill
            alt="promo-banner"
            className="rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center shadow-sm">
          <Image
            src="https://media.21cineplex.com/webcontent/gallery/pictures/168622916559421_925x527.jpg"
            fill
            alt="promo-banner"
            className="rounded-lg"
          />
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center shadow-sm">
          <Image
            src="https://media.21cineplex.com/webcontent/gallery/pictures/16826667719906_925x527.jpg"
            fill
            alt="promo-banner"
            className="rounded-lg"
          />
        </SwiperSlide>
        <AnimatePresence>
          {showNavigation && <AppBannerSliderNavigation />}
        </AnimatePresence>
      </Swiper>
    </div>
  );
}

const AppBannerSliderNavigation = () => {
  const swiper = useSwiper();
  return (
    <>
      <motion.button
        onClick={() => swiper.slidePrev()}
        initial={{ opacity: 0, bottom: "47%" }}
        animate={{ opacity: 1, bottom: "50%" }}
        exit={{ opacity: 0, bottom: "47%" }}
        transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
        className="btn-prev absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 p-2.5 shadow-md disabled:opacity-50"
      >
        <BsChevronLeft size="20" />
      </motion.button>
      <motion.button
        onClick={() => swiper.slideNext()}
        initial={{ opacity: 0, bottom: "47%" }}
        animate={{ opacity: 1, bottom: "50%" }}
        exit={{ opacity: 0, bottom: "47%" }}
        transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
        className="btn-next absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 p-2.5 shadow-md disabled:opacity-50"
      >
        <BsChevronRight size="20" />
      </motion.button>
    </>
  );
};
