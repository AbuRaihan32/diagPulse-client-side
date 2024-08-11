import { GoArrowRight } from "react-icons/go";
import PropTypes from "prop-types";
import { AiOutlineCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProCard = ({ pro, index }) => {
  const { title, dates } = pro;

  return (
    <div>
      <div className="card h-full bg-gray-50 rounded-[7px] hover:bg-[#0F2976] hover:text-white group transition-all duration-400 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] text-gray-800">
        <div className="card-body relative overflow-hidden rounded-[7px]">
          <div className="absolute w-14 h-14 -top-3 -right-3 flex justify-center items-center bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] mx-auto rounded-full text-white">
            <span className="">{index + 1}</span>
          </div>
          <div className="flex-grow ">
            <h3
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="500"
              className="font-semibold group-hover:text-white"
            >
              {title}
            </h3>
            <div className="divider -my-1 group-hover:divider-accent"></div>
            <p data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="500" className="text-base text-body-color leading-relaxed my-2">
              <ul className="text-xs">
                <li className="flex items-start gap-1">
                  <AiOutlineCaretRight className=" text-[#24BAD2] text-[18px] w-5"></AiOutlineCaretRight>{" "}
                  <span>{pro.details[0].slice(0, 43)}</span>
                </li>
                <li className="flex items-start gap-1">
                  <AiOutlineCaretRight className="text-[#24BAD2] text-[18px] w-5"></AiOutlineCaretRight>{" "}
                  <span>{pro.details[1].slice(0, 43)}</span>
                </li>
                <li className="flex items-start gap-1">
                  <AiOutlineCaretRight className="text-[#24BAD2] text-[18px] w-5"></AiOutlineCaretRight>{" "}
                  <span>{pro.details[2].slice(0, 43)}</span>
                </li>
              </ul>
            </p>
            <p data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="500" className="text-[15px]">
              <span className=" font-bold group-hover:text-white">Date :</span>{" "}
              {dates}
            </p>
          </div>
          <div data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="500" className="-mb-2">
            <Link className="relative bg-[#E1F6F9] inline-flex items-center justify-start px-7 py-2 overflow-hidden font-medium transition-all rounded-full group mr-2">
              <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
                <span className="">see more</span>
                <GoArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ProCard.propTypes = {
  pro: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default ProCard;
