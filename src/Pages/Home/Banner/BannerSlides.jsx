import CouponCode from "./CouponCode";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BannerSlides = ({ banner }) => {
  console.log(banner.bgImage);
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

            <p className="mt-2 max-w-lg sm:text-xl/relaxed">{banner.text}</p>
            <div className="mt-3">
              <CouponCode code={banner.couponCode}></CouponCode>
            </div>

            <p className="text-sm w-fit mt-2 text-red-700 font-medium">
              Valid Till : {banner.expireDate}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link to={"/login"}>
                <button className="py-3 px-10 btn hover:bg-gradient-to-r hover:from-[#0F2976] hover:to-[#2344a0] rounded-full bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] text-white ">
                  Get Started
                </button>
              </Link>

              <Link to={"/allTestForUser"}>
                <button className="py-3 px-10 btn bg-gradient-to-r from-[#0F2976] to-[#2344a0] rounded-full hover:bg-gradient-to-r hover:from-[#25BCCF] hover:to-[#2EE9B1] text-white ">
                  See All Tests
                </button>
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
