import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const BannerCard = ({ banner, refetch }) => {
  const [change, setChange] = useState(true);
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const { register, handleSubmit } = useForm();

  const {
    _id,
    title,
    image,
    bgImage,
    text,
    couponCode,
    discountRate,
    expireDate,
    status,
  } = banner;

  // ! handle Update
  const handleUpdate = () => {
    modalRef.current.showModal();
  };

  // ! confirm Update
  const onSubmit = (data) => {
    const {
      title,
      image,
      bgImage,
      text,
      couponCode,
      discountRate,
      expireDate,
      status,
    } = data;

    const newBanner = {
      title,
      image,
      bgImage,
      text,
      couponCode,
      discountRate,
      expireDate,
      status,
    };

    // update
    axiosSecure
      .patch(`/updateBanner/${_id}`, newBanner)
      .then((data) => {
        if (data.data.modifiedCount) {
          Swal.fire({
            title: "Updated",
            text: "Your Banner has been updated.",
            icon: "success",
          });
          refetch();
          modalRef.current.close();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You didn't make any changes",
          });
          modalRef.current.close();
        }
      })
      .catch((err) => console.log(err));
  };

  // ! handle delete
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/deleteBanner/${_id}`)
          .then((data) => {
            if (data.data.deletedCount === 1) {
              Swal.fire({
                title: "Delete",
                text: "Your food has been Deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <div className="flex items-center justify-center mb-2">
        <div className="relative flex w-[95%] flex-col lg:flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] mt-4">
          <div
            style={bgStyle}
            className="relative m-0 lg:w-2/5 shrink-0 overflow-hidden rounded-xl lg:rounded-r-none bg-white bg-clip-border text-gray-700"
          >
            <img
              src={image}
              alt="image"
              className="w-52 h-full object-cover absolute right-0 border-4 border-r-0 border-y-0 rounded-l-full border-[#1E40AF]"
            />
          </div>
          {/* <img src={image} alt="image" className="object-cover absolute z-10 w-40 h-32 top-[30%] left-[25%]" /> */}
          <div className="p-6 relative">
            <p className="absolute border text-[#32cd32] border-[#32cd32] md:px-5 px-2 py-1 rounded-full right-2 top-5 md:right-5 md:top-5">
              {status}
            </p>
            <h6 className="mb-4 block font-sans text-base font-semibold leading-relaxed tracking-normal text-red-600 antialiased">
              Expire In : {expireDate}
            </h6>
            <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased text-[#072070]">
              {title}
            </h4>
            <p className="mb-3 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              {text}
            </p>
            <div className="flex gap-8 items-center">
              <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal antialiased">
                Coupon Code : {couponCode}
              </h6>

              <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal antialiased">
                Discount Rate : {discountRate}
              </h6>
            </div>
            <div className="flex justify-evenly items-center">
              <button
                onClick={() => handleUpdate(_id)}
                className="relative md:w-[25%] border inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all rounded-full bg-[#1E3A8A] group mr-2 text-white"
              >
                <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-28 group-hover:translate-x-0"></span>
                <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
                  <span className="">Update</span>
                </span>
              </button>

              <button
                onClick={() => handleDelete(_id)}
                className="relative md:w-[25%] border inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all rounded-full bg-[#1E3A8A] group mr-2 text-white"
              >
                <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-28 group-hover:translate-x-0"></span>
                <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
                  <span className="">Delete</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <dialog id="my_modal_4" className="modal md:ml-[120px]" ref={modalRef}>
        <div className="modal-box w-11/12 md:max-w-[60%]">
          <div>
            <h1 className="text-center text-3xl font-medium my-5">
              Update The Banner
            </h1>
          </div>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            {/* row 1 */}
            <div className="md:flex gap-4 ">
              <div className="w-full mb-3">
                <label className="text-xs font-semibold px-1">
                  Banner Title
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={title}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Banner Title"
                    {...register("title")}
                  />
                </div>
              </div>

              <div className="w-full mb-3">
                <label className="text-xs font-semibold px-1">
                  Banner Description
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={text}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Description"
                    {...register("text")}
                  />
                </div>
              </div>
            </div>

            {/* row 2 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-3">
                <label className="text-xs font-semibold px-1">Photo URL</label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={image}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Side Photo URL"
                    {...register("image")}
                  />
                </div>
              </div>
              <div className="md:w-1/2 mb-3 ">
                <label className="text-xs font-semibold px-1">
                  Background Image URL
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={bgImage}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Background Photo URL"
                    {...register("bgImage")}
                  />
                </div>
              </div>
            </div>

            {/* row 3 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-3">
                <label className="text-xs font-semibold px-1">
                  Coupon Code
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={couponCode}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Coupon Code"
                    {...register("couponCode")}
                  />
                </div>
              </div>

              <div className="md:w-1/2 mb-3">
                <label className="text-xs font-semibold px-1">
                  Discount Rate
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={discountRate}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Discount rate"
                    {...register("discountRate")}
                  />
                </div>
              </div>
            </div>

            {/* row 4 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-3">
                <label className="text-xs font-semibold px-1">
                  Expire Date
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={expireDate}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Expire date"
                    {...register("expireDate")}
                  />
                </div>
              </div>

              <div className="md:w-1/2 mb-3">
                <label className="text-xs font-semibold px-1">Status</label>
                <div className="flex flex-col relative">
                  <input
                    type="text"
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    value={change ? "Active" : "UnActive"}
                    {...register("status")}
                  />
                  <div
                    onClick={() => setChange(!change)}
                    className="absolute right-5 top-[6px] text-xl"
                  >
                    <span className="p-[6px] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] rounded-md text-xs text-white cursor-pointer">
                      {" "}
                      Change{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 mt-3">
              <div className="md:w-1/2 flex justify-center">
                <button className=" w-[70%] text-xl text-white relative px-5 py-2 font-semibold group">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-[#32CC32] group-hover:skew-x-[18deg]"></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-gradient-to-r hover:from-[#31EDAF] hover:to-[#24BAD2] group-hover:-skew-x-[18deg]"></span>

                  <span className="flex items-center justify-center gap-2 relative">
                    <span className="">Save Change</span>{" "}
                  </span>
                </button>
              </div>
              <div className="md:w-1/2">
                <form method="dialog" className="flex justify-center">
                  {/* if there is a button, it will close the modal */}
                  <button className=" w-[70%] text-xl text-white relative px-5 py-2 font-semibold group">
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-[#32CC32] group-hover:skew-x-[18deg]"></span>
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-gradient-to-r hover:from-[#31EDAF] hover:to-[#24BAD2] group-hover:-skew-x-[18deg]"></span>

                    <span className="flex items-center justify-center gap-2 relative">
                      <span className="">close</span>{" "}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

BannerCard.propTypes = {
  banner: PropTypes.object.isRequired,
  refetch: PropTypes.node,
};

export default BannerCard;
