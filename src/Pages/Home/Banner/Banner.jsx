import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import BannerSlides from "./BannerSlides";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";

const Banner = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: bannerData = {},
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await fetch("/banner.json");
      const data = await res.json();
      return data;
    },
  });

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#32cd32"></PuffLoader>
      </div>
    );
  }

  return (
    <>
      <div className="-z-10">
        <Swiper
          rewind={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {/* bannerData Map */}
          {bannerData?.map((bn) => (
            <>
              <SwiperSlide key={bn.id}>
                <BannerSlides banner={bn}></BannerSlides>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>

      <div className="container">
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Banner;
