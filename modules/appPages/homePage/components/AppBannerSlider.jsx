import "swiper/css"

import { useState } from "react"
import Image from "next/image"
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
        className="h-40 w-full lg:h-96 lg:w-4/6"
        autoplay={{ disableOnInteraction: false }}
        navigation={{ enabled: true }}
        modules={[Navigation, Autoplay]}
        loop={true}
        spaceBetween={50}
      >
        <SwiperSlide className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg shadow-sm">
          <div className="relative h-full w-full  bg-slate-100 dark:bg-slate-700">
            <Image
              fill
              src="https://ymudtpspkdopgzrtzevt.supabase.co/storage/v1/object/sign/banner_images/169269949110133_925x527.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXJfaW1hZ2VzLzE2OTI2OTk0OTExMDEzM185MjV4NTI3LndlYnAiLCJpYXQiOjE2OTMwNzU3MzcsImV4cCI6MTcyNDYxMTczN30.Fx3twPkj0fQIpgekeSJa6OzuX1YZB-jjL8idFMahEdg&t=2023-08-26T18%3A48%3A57.142Z"
              className="object-fill"
              alt="banner-image"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg shadow-sm">
          <div className="relative h-full w-full  bg-slate-100 dark:bg-slate-700">
            <Image
              fill
              src="https://ymudtpspkdopgzrtzevt.supabase.co/storage/v1/object/sign/banner_images/167816028263406_925x527-transformed.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXJfaW1hZ2VzLzE2NzgxNjAyODI2MzQwNl85MjV4NTI3LXRyYW5zZm9ybWVkLndlYnAiLCJpYXQiOjE2OTMwNzUyNDYsImV4cCI6MTcyNDYxMTI0Nn0.a3TIrK6aXu9JTifwk-XSTRxFCEQBEUwWFAnIKwQVAMw&t=2023-08-26T18%3A40%3A46.598Z"
              className="object-fill"
              alt="banner-image"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg shadow-sm">
          <div className="relative h-full w-full  bg-slate-100 dark:bg-slate-700">
            <Image
              fill
              src="https://ymudtpspkdopgzrtzevt.supabase.co/storage/v1/object/sign/banner_images/16927035046055_925x527.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXJfaW1hZ2VzLzE2OTI3MDM1MDQ2MDU1XzkyNXg1Mjcud2VicCIsImlhdCI6MTY5MzA3NTc3MCwiZXhwIjoxNzI0NjExNzcwfQ.RT3UnPm7kh-iez8KOmX18gJujlEsSSCFbsCU7ZSdF4o&t=2023-08-26T18%3A49%3A31.037Z"
              className="object-fill"
              alt="banner-image"
            />
          </div>
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
        className="btn-prev absolute left-0 z-20 flex  h-8 w-8 items-center justify-center rounded-full bg-slate-50 p-2.5 shadow-md disabled:opacity-50 dark:bg-slate-900 lg:h-10 lg:w-10"
      >
        <BsChevronLeft size="20" />
      </motion.button>
      <motion.button
        onClick={() => swiper.slideNext()}
        initial={{ opacity: 0, bottom: "47%" }}
        animate={{ opacity: 1, bottom: "50%" }}
        exit={{ opacity: 0, bottom: "47%" }}
        transition={{ ease: "easeInOut", duration: 0.2, delay: 0.1 }}
        className="btn-next absolute right-0 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 p-2.5 shadow-md disabled:opacity-50 dark:bg-slate-900 lg:h-10 lg:w-10"
      >
        <BsChevronRight size="20" />
      </motion.button>
    </>
  )
}
