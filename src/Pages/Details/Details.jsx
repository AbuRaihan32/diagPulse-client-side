import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { PuffLoader } from "react-spinners";
import { FaCircleChevronRight } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { useRef } from "react";
import Swal from "sweetalert2";
import Payment from "./Payment";

const Details = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const modalRef = useRef(null);
  const { data: test = [], isPending, refetch } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/test/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#25BCCF"></PuffLoader>
      </div>
    );
  }

  const {
    name,
    date,
    description,
    category,
    image,
    sample_type,
    purpose,
    price,
    slot,
  } = test;

  const handleBookNowBtn = () => {
    if (parseInt(slot) > 0) {
      modalRef.current.showModal();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "All slots are full for this test",
      });
    }
  };

  return (
    <>
      <div className="bg-[#2EE2B5] rounded-[7px] shadow-xl transition-all duration-400 w-[80%] mx-auto">
        <div className="card bg-base-100 h-full rounded-[7px] hover:bg-[#0F2976] hover:text-white rounded-br-[100px] group transition-all duration-400">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex items-center justify-center">
                <div className="mask mask-hexagon w-72 h-72 flex justify-center items-center bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] mx-auto ">
                  <img
                    className="mask mask-hexagon w-[275px] h-[275px] "
                    src={image}
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold my-1">{name}</h3>
                  <p className="text-base text-body-color leading-relaxed mb-2">
                    {purpose}
                  </p>
                  <ul className="list-disc text-[15px]">
                    <li className="list-none">
                      {" "}
                      <span className="flex items-center gap-2">
                        <FaCircleChevronRight className="text-[#25BCCF] group-hover:text-[#2EE9B1]"></FaCircleChevronRight>
                        Date : {date}
                      </span>
                    </li>
                    <li className="list-none">
                      {" "}
                      <span className="flex items-center gap-2">
                        <FaCircleChevronRight className="text-[#25BCCF] group-hover:text-[#2EE9B1]"></FaCircleChevronRight>
                        Category : {category}
                      </span>
                    </li>
                    <li className="list-none">
                      {" "}
                      <span className="flex items-center gap-2">
                        <FaCircleChevronRight className="text-[#25BCCF] group-hover:text-[#2EE9B1]"></FaCircleChevronRight>
                        Sample : {sample_type}
                      </span>
                    </li>
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
                        Slots : {slot}
                      </span>
                    </li>
                  </ul>

                  <p className="mt-3">
                    <span className="font-bold">Description : </span>{" "}
                    {description}
                  </p>
                </div>
                <div className="mt-4">
                  <button className="p-3 rounded-full bg-[#E1F6F9] group-hover:hidden transition-all duration-400 mb-2">
                    <GoArrowRight />
                  </button>
                  <div className="flex gap-4">
                    <button
                      onClick={handleBookNowBtn}
                      className="py-2 px-3 md:py-3 md:px-5 rounded-full bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] hidden group-hover:inline-block transition-all duration-400 text-white"
                    >
                      Book Now
                    </button>

                    <Link to={-1}>
                      <button className="py-2 px-3 md:py-3 md:px-5 rounded-full bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] hidden group-hover:inline-block transition-all duration-400 text-white">
                        Go Back
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_4" className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 md:max-w-[60%]">
          <div className="my-4">Amount : {price} $</div>
          <Payment test={test} modalRef={modalRef} refetch={refetch}></Payment>
          <div className=" flex justify-end">
            <div className="w-fit -mt-10">
              <form method="dialog" className="flex justify-center">
                {/* if there is a button, it will close the modal */}
                <button className=" px-4 py-2 font-semibold bg-[#2EE2B5] rounded-md text-white">
                  close
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Details;
