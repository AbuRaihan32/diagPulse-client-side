import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BannerSlides from "./BannerSlides";
import { PuffLoader } from "react-spinners";
import useBanner from "../../../Hooks/useBanner";

const Banner = () => {
  const { bannerData, isPending, isError } = useBanner();

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#2EE9B1"></PuffLoader>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <span className="text-xl">Something went wrong</span>
      </div>
    );
  }

  return (
    <>
      <div className="-z-10 rounded-lg">
        <Swiper
          rewind={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {/* bannerData Map */}
          {bannerData?.map((bn, index) => (
            <>
              <SwiperSlide key={index}>
                <BannerSlides banner={bn}></BannerSlides>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>

      {/* <div className="container">
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
      </div> */}
    </>
  );
};

export default Banner;
