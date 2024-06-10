import { GoArrowRight } from "react-icons/go";
import PropTypes from "prop-types";
import { AiOutlineCaretRight } from "react-icons/ai";

const ProCard = ({ pro }) => {
  const { title, dates } = pro;

  return (
    <div>
      <div className="card h-full bg-gray-50 rounded-[7px] hover:bg-[#0F2976] hover:text-white group transition-all duration-400 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] text-gray-800">
        <div className="card-body relative overflow-hidden rounded-[7px]">
          <div className="absolute w-14 h-14 -top-3 -right-3 flex justify-center items-center bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] mx-auto rounded-full text-white">
            <span className="">1</span>
          </div>
          <div className="flex-grow ">
            <h3 className="font-semibold group-hover:text-white">{title}</h3>
            <div className="divider -my-1 group-hover:divider-accent"></div>
            <p className="text-base text-body-color leading-relaxed my-2">
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
            <p className="text-[15px]">
              <span className=" font-bold group-hover:text-white">Date :</span> {dates}
            </p>
          </div>
          <div className="-mb-2">
            <button className="px-4 py-2 rounded-full bg-[#E1F6F9] group-hover:bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] transition-all duration-400 flex items-center justify-center gap-2">
              <span className="">see more</span>
              <GoArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProCard.propTypes = {
  pro: PropTypes.object.isRequired,
};

export default ProCard;
