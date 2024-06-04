import Lottie from "lottie-react";
import CouponCode from "./CouponCode";
import PropTypes from "prop-types";
import bg5 from "../../../../public/bg-5.json";
import { Link } from "react-router-dom";

const BannerSlides = ({ banner }) => {
  return (
    <section className="bg-[url(https://i.ibb.co/YLGKrW7/pexels-chokniti-khongchum-1197604-2280568.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="mx-auto max-w-screen-xl h-vh lg:flex lg:h-[450px] lg:items-center relative">
        <div className="lg:flex justify-between items-center bg-black bg-opacity-60 ">
          <div className="w-full text-start ltr:sm:text-left rtl:sm:text-right p-5 lg:pl-14 px-32 gap-10 ">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              {banner.title}
              <strong className="block font-extrabold text-rose-700">
                {" "}
                {banner.title}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">{banner.text}</p>
            <CouponCode code={banner.couponCode}></CouponCode>

            <p className="text-sm bg-emerald-300 w-fit p-2">
              Valid Till: {banner.expireDate}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </a>

              <Link to={'/dashboard/allTests'}
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                All Test
              </Link>
            </div>
          </div>

          <div className="w-full lg:h-[450px] hidden lg:inline overflow-hidden">
            <img
              className="h-full ml-8  rounded-l-full border-l-[15px] object-cover"
              src={"https://i.ibb.co/8K0z2Th/pexels-thisisengineering-3912481.jpg"}
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
