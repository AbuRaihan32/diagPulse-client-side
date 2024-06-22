import { useEffect, useRef, useState } from "react";
import KeenSlider from "keen-slider";

import "keen-slider/keen-slider.min.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { PuffLoader } from "react-spinners";
import { AiOutlineCaretRight } from "react-icons/ai";
import SectionHeder from "../../../Components/SectionHeder";

const Recommendation = () => {
  const sliderRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const [slider, setSlider] = useState(null);

  const { data: recommendations = [], isPending } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recommendations");
      return res.data;
    },
  });

  useEffect(() => {
    if (!sliderRef.current || recommendations.length === 0) return;

    const newSlider = new KeenSlider(sliderRef.current, {
      loop: true,
      slides: {
        origin: "center",
        perView: 1.25,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 1024px)": {
          slides: {
            origin: "auto",
            perView: 1.5,
            spacing: 32,
          },
        },
      },
    });

    setSlider(newSlider);

    return () => {
      newSlider.destroy();
    };
  }, [recommendations]);

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#2EE9B1"></PuffLoader>
      </div>
    );
  }

  const handlePrevClick = () => {
    if (slider) {
      slider.prev();
    }
  };

  const handleNextClick = () => {
    if (slider) {
      slider.next();
    }
  };

  return (
    <section className="mt-10 md:max-w-[90%] mx-auto -mb-7">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionHeder
            header={"Personalized Recommendation"}
            description="Get started with personalized recommendations tailored to your
            needs. Experience tailored expertise based on your preferences"
          ></SectionHeder>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row gap-5 text-gray-800">
          <div className="lg:w-[40%] hidden lg:flex items-center justify-center bg-gray-50 rounded-[7px] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-4">
            <div className=" text-center">
              <h2 className="text-xl font-bold">
                Tailored Solutions for Your Unique Needs!
              </h2>
              <p className="mt-4">
                Discover tailored solutions for your practice with our
                personalized recommendations, designed to optimize efficiency
                and elevate patient care.
              </p>
              {/* button */}
              <div className="hidden lg:flex justify-center gap-3 mt-8">
                <button
                  id="keen-slider-previous-desktop"
                  className="p-3 border border-white rounded-full bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] text-white"
                  onClick={handlePrevClick}
                >
                  <IoIosArrowBack></IoIosArrowBack>
                </button>
                <button
                  id="keen-slider-next-desktop"
                  className="p-3 border border-white rounded-full bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] text-white"
                  onClick={handleNextClick}
                >
                  <IoIosArrowForward></IoIosArrowForward>
                </button>
              </div>
            </div>
          </div>

          {/* sliders */}
          <div ref={sliderRef} className="keen-slider">
            {recommendations.map((item) => (
              <div key={item.title} className="keen-slider__slide">
                <blockquote className="flex h-full flex-col justify-between p-4 sm:p-6 lg:p-10 bg-[#ECFFFB] rounded-[7px]">
                  <div>
                    <div className="">
                      <p className="text-2xl font-bold text-[#112B7A] sm:text-3xl">
                        {item.title}
                      </p>

                      <p className="mt-2 leading-relaxed">
                        {item.content.slice(0, 200)}
                      </p>
                      <p className="text-[#112B7A] font-medium mt-2">
                        Suggestions:
                      </p>
                      <ul className="text-xs">
                        <li className="flex items-start gap-1">
                          <AiOutlineCaretRight className=" text-[#24BAD2] text-[18px] w-5"></AiOutlineCaretRight>{" "}
                          <span>{item.suggested_actions[0]}</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <AiOutlineCaretRight className="text-[#24BAD2] text-[18px] w-5"></AiOutlineCaretRight>{" "}
                          <span>{item.suggested_actions[1]}</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <AiOutlineCaretRight className="text-[#24BAD2] text-[18px] w-5"></AiOutlineCaretRight>{" "}
                          <span>{item.suggested_actions[2]}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <footer className="mt-2 text-sm ">
                    &mdash; {item.suggestor_name}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          {/* button for small device */}
          <div className="flex lg:hidden justify-center gap-3 mt-8">
            <button
              id="keen-slider-previous"
              className="p-3 border border-white rounded-full bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] text-white"
              onClick={handlePrevClick}
            >
              <IoIosArrowBack></IoIosArrowBack>
            </button>
            <button
              id="keen-slider-next"
              className="p-3 border border-white rounded-full bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] text-white"
              onClick={handleNextClick}
            >
              <IoIosArrowForward></IoIosArrowForward>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
