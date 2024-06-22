import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionHeder from "../../../../Components/SectionHeder";
import { useState } from "react";

const AddBanner = () => {
  const axiosSecure = useAxiosSecure();
  const [change, setChange] = useState(true)
  const { register, handleSubmit, reset } = useForm();

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

    // Add Banner
    axiosSecure
      .post(`/addBanner`, newBanner)
      .then((data) => {
        if (data.data.insertedId) {
          Swal.fire({
            title: "Added",
            text: "Your Banner has been updated.",
            icon: "success",
          });
          reset()
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "something went wrong",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SectionHeder
        header={"Add banner"}
        description={"Hi Admin! Please Be Careful"}
      ></SectionHeder>
      <div className="w-[90%] mx-auto shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-8 rounded-md">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          {/* row 1 */}
          <div className="md:flex gap-4 ">
            <div className="w-full mb-3">
              <label className="text-xs font-semibold px-1">Banner Title</label>
              <div className="flex flex-col">
                <input
                  type="text"
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
              <label className="text-xs font-semibold px-1">Coupon Code</label>
              <div className="flex flex-col">
                <input
                  type="text"
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
              <label className="text-xs font-semibold px-1">Expire Date</label>
              <div className="flex flex-col">
                <input
                  type="text"
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
                  value={change? 'Active' : 'UnActive'}
                  {...register("status")}
                />
                <p className="text-xs font-semibold ml-1 text-[#1e5744]">Please click on the field After Change</p>
                <div
                  onClick={() => setChange(!change)}
                  className="absolute right-5 top-[6px] text-xl"
                >
                 <span className="p-[6px] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] rounded-md text-xs text-white cursor-pointer"> Change </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button className=" w-[70%] text-xl text-white relative px-5 py-2 font-semibold group">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-[#32CC32] group-hover:skew-x-[18deg]"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-gradient-to-r hover:from-[#31EDAF] hover:to-[#24BAD2] group-hover:-skew-x-[18deg]"></span>

              <span className="flex items-center justify-center gap-2 relative">
                <span className="">Add Banner</span>{" "}
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBanner;
