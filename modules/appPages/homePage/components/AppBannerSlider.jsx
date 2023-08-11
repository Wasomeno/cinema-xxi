import "swiper/css"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"

export function AppBannerSlider() {
  const [showNavigation, setShowNavigation] = useState(false)
  return (
    <div
      className="swiper-container relative w-full lg:w-5/6"
      onMouseEnter={() => setShowNavigation(true)}
      onMouseLeave={() => setShowNavigation(false)}
    >
      <Swiper
        className="h-40 w-full lg:h-80"
        autoplay={{ disableOnInteraction: false }}
        navigation={{ enabled: true }}
        modules={[Navigation, Autoplay]}
        loop={true}
        spaceBetween={50}
      >
        <SwiperSlide className="flex h-full w-full items-center justify-center shadow-sm">
          <div className="h-full w-full rounded-lg bg-slate-100 dark:bg-slate-700" />
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center shadow-sm">
          <div className="h-full w-full rounded-lg bg-slate-100 dark:bg-slate-700" />
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center shadow-sm">
          <div className="h-full w-full rounded-lg bg-slate-100 dark:bg-slate-700" />
        </SwiperSlide>
        <AnimatePresence>
          {showNavigation && <AppBannerSliderNavigation />}
        </AnimatePresence>
      </Swiper>
    </div>
  )
}

const AppBannerSliderNavigation = () => {
  const swiper = useSwiper()
  return (
    <>
      <motion.button
        onClick={() => swiper.slidePrev()}
        initial={{ opacity: 0, bottom: "47%" }}
        animate={{ opacity: 1, bottom: "50%" }}
        exit={{ opacity: 0, bottom: "47%" }}
        transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
        className="btn-prev absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 p-2.5 shadow-md disabled:opacity-50 dark:bg-slate-900"
      >
        <BsChevronLeft size="20" />
      </motion.button>
      <motion.button
        onClick={() => swiper.slideNext()}
        initial={{ opacity: 0, bottom: "47%" }}
        animate={{ opacity: 1, bottom: "50%" }}
        exit={{ opacity: 0, bottom: "47%" }}
        transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
        className="btn-next absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 p-2.5 shadow-md disabled:opacity-50 dark:bg-slate-900"
      >
        <BsChevronRight size="20" />
      </motion.button>
    </>
  )
}
