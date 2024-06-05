import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const BannerCard = ({ banner, index, refetch }) => {
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
      <div className="flex items-center justify-center mb-6">
        <div className="relative flex w-[95%] flex-col lg:flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div style={bgStyle} className="relative m-0 lg:w-2/5 shrink-0 overflow-hidden rounded-xl lg:rounded-r-none bg-white bg-clip-border text-gray-700">
            <img
              src={image}
              alt="image"
              className="w-48 h-36 object-cover absolute right-0 border-4 border-r-0 border-t-0 rounded-bl-[150px] border-[#1E40AF]"
            />
          </div>
          {/* <img src={image} alt="image" className="object-cover absolute z-10 w-40 h-32 top-[30%] left-[25%]" /> */}
          <div className="p-6 relative">
            <p className="absolute bg-green-700 text-white p-1 md:p-2 rounded-md right-2 top-5 md:right-5 md:top-5">
              {status}
            </p>
            <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
              Expire In : {expireDate}
            </h6>
            <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {title}
            </h4>
            <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              {text}
            </p>
            <div className="flex justify-around items-center">
              <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                Coupon Code : {couponCode}
              </h6>

              <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                Discount Rate : {discountRate}
              </h6>
            </div>
            <div className="flex justify-around items-center">
              <button
                onClick={() => handleUpdate(_id)}
                className="btn btn-accent"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(_id)}
                className="btn btn-accent"
              >
                Delete
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
  index: PropTypes.number,
};

export default BannerCard;
