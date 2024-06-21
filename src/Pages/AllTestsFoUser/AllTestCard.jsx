import { GoArrowRight } from "react-icons/go";

import PropTypes from "prop-types";
import { FaCircleChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AllTestCard = ({ test }) => {
  const { slot, date, image, name, purpose, price, _id , bookedCount} = test;
  return (
    <div className="bg-[#2EE2B5] rounded-[7px] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] transition-all duration-400 text-gray-800">
      <div className="card h-full rounded-[7px] bg-gray-50 hover:bg-[#0F2976] hover:text-white rounded-br-[100px] group transition-all duration-400">
        <div className="card-body relative">
          <p className="absolute text-xs right-4 top-4 py-1 px-2 rounded-full bg-gray-100 text-gray-500 group-hover:bg-[#0F2976] transition-all duration-400">Booked {bookedCount? bookedCount : 0}</p>
          <div className="mask mask-hexagon w-36 h-36 flex justify-center items-center bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] mx-auto ">
            <img className="mask mask-hexagon w-32 h-32 " src={image} />
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-semibold my-1">{name}</h3>
            <p className="text-base text-body-color leading-relaxed mb-2">
              {purpose.slice(0, 50)}
            </p>
            <ul className="list-disc text-[15px]">
              <li className="list-none">
                {" "}
                <span className="flex items-center gap-2">
                  <FaCircleChevronRight className="text-[#25BCCF] group-hover:text-[#2EE9B1]"></FaCircleChevronRight>
                  Price : {price} $
                </span>
              </li>
              <li className="list-none">
                {" "}
                <span className="flex items-center gap-2">
                  <FaCircleChevronRight className="text-[#25BCCF] group-hover:text-[#2EE9B1]"></FaCircleChevronRight>
                  Slot : {slot}
                </span>
              </li>
              <li className="list-none">
                {" "}
                <span className="flex items-center gap-2">
                  <FaCircleChevronRight className="text-[#25BCCF] group-hover:text-[#2EE9B1]"></FaCircleChevronRight>
                  Date : {date}
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <button className="p-3 rounded-full bg-[#E1F6F9] group-hover:hidden transition-all duration-400 mb-2">
              <GoArrowRight />
            </button>
            <Link to={`/details/${_id}`}>
              <button className="py-3 px-5 rounded-full bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] hidden group-hover:inline-block transition-all duration-400 text-white">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

AllTestCard.propTypes = {
  test: PropTypes.object.isRequired,
};

export default AllTestCard;
