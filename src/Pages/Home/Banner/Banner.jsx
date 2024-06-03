import CouponCode from "./CouponCode";

const Banner = () => {
  return (
    <>
      <div>
        <section
          className={`border bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat`}
        >
          <div className="mx-auto max-w-screen-xl h-vh lg:flex lg:h-[450px] lg:items-center ">
            <div className="lg:flex justify-between items-center">
              <div className="w-full text-start ltr:sm:text-left rtl:sm:text-right p-5 lg:pl-10">
                <h1 className="text-3xl font-extrabold sm:text-5xl animate-pulse">
                  Let us find your
                  <strong className="block font-extrabold text-rose-700">
                    {" "}
                    Forever Home.{" "}
                  </strong>
                </h1>

                <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nesciunt illo tenetur fuga ducimus numquam ea!
                </p>
                <CouponCode code={'STEALDEAL20'}></CouponCode>

                <div className="mt-8 flex flex-wrap gap-4 text-center">
                  <a
                    href="#"
                    className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                  >
                    Get Started
                  </a>

                  <a
                    href="#"
                    className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div className="w-full lg:h-[450px] hidden lg:inline overflow-hidden">
                <img
                  className="h-full ml-8  rounded-l-full border-l-[15px] object-cover"
                  src={"https://i.ibb.co/TbSHDzj/pexels-asadphoto-1450351.jpg"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
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
