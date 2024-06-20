import CouponCode from "./CouponCode";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BannerSlides = ({ banner }) => {
  const bgImageStyle = {
    backgroundImage: `url(${banner.bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section style={bgImageStyle} className="rounded-3xl">
      <div className="mx-auto max-w-screen-xl h-vh lg:flex lg:h-[500px] lg:items-center relative rounded-3xl">
        <div className="lg:flex justify-between items-center bg-gray-50 bg-opacity-80 rounded-3xl">
          <div className="w-full text-start ltr:sm:text-left rtl:sm:text-right p-5 lg:pl-24 lg:px-32 gap-10 ">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-[#0F2976]">
              {banner.title}
            </h1>

            <p className="mt-2 max-w-lg sm:text-xl/relaxed text-black">{banner.text}</p>
            <div className="mt-3">
              <CouponCode code={banner.couponCode}></CouponCode>
            </div>

            <div className="flex gap-3">
              <p className="text-sm w-fit mt-2 text-red-700 font-medium">
                Discount Rate : {banner.discountRate}
              </p>
              <p className="text-sm w-fit mt-2 text-red-700 font-medium">
                Valid Till : {banner.expireDate}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                to={"/login"}
                className="relative border inline-flex items-center justify-start px-7 py-2 overflow-hidden font-medium transition-all rounded-full bg-[#0F2976] group mr-2 text-white"
              >
                <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
                  <span className="">Get Started</span>
                </span>
              </Link>

              <Link
                to={"/allTestForUser"}
                className="relative border border-[#2EE9B1] inline-flex items-center justify-start px-7 py-2 overflow-hidden font-medium transition-all rounded-full hover:bg-white group mr-2 text-[#0F2976]"
              >
                <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
                  <span className="">See All Tests</span>
                </span>
              </Link>
            </div>
          </div>

          <div className="w-full lg:h-[500px] hidden lg:inline overflow-hidden rounded-3xl">
            <img
              className="h-full ml-8  rounded-l-full border-l-[15px] border-[#2EE9B1] object-cover rounded-3xl"
              src={banner.image}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

BannerSlides.propTypes = {
  banner: PropTypes.object.isRequired,
};

export default BannerSlides;
