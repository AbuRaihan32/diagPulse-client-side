import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionHeder from "../../../../Components/SectionHeder";

const AddTest = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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
    } = data;

    const newTest = {
      name,
      date,
      description,
      category,
      image,
      sample_type,
      purpose,
      price,
      slot,
    };

    // Add Test
    axiosSecure
      .post(`/addTest`, newTest)
      .then((data) => {
        if (data.data.insertedId) {
          Swal.fire({
            title: "Added",
            text: "Your Test has been updated.",
            icon: "success",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You didn't make any changes",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SectionHeder
        header={"Add Test"}
        description={"Hi Admin! Please Be Careful to Add Test for Users"}
      ></SectionHeder>
      <div className="w-[90%] mx-auto shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-8 rounded-md">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          {/* row 1 */}
          <div className="md:flex gap-4 ">
            <div className="w-full mb-3">
              <label className="text-xs font-semibold px-1">Test Name</label>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Test Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="w-full mb-3">
              <label className="text-xs font-semibold px-1">
                Test Category
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Description"
                  {...register("category", { required: true })}
                />
                {errors.category && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* row 2 */}
          <div className="md:flex gap-4">
            <div className="md:w-1/2 mb-3">
              <label className="text-xs font-semibold px-1">Image URL</label>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Photo URL"
                  {...register("image", { required: true })}
                />
                {errors.image && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="md:w-1/2 mb-3 ">
              <label className="text-xs font-semibold px-1">Date</label>
              <div className="flex flex-col">
                <input
                  type="date"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Photo URL"
                  {...register("date", { required: true })}
                />
                {errors.date && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* row 3 */}
          <div className="md:flex gap-4">
            <div className="md:w-1/2 mb-3">
              <label className="text-xs font-semibold px-1">Sample Type</label>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="sample_type"
                  {...register("sample_type", { required: true })}
                />
                {errors.sample_type && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="md:w-1/2 mb-3">
              <label className="text-xs font-semibold px-1">Purpose</label>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="purpose"
                  {...register("purpose")}
                />
              </div>
            </div>
          </div>

          {/* row 4 */}
          <div className="md:flex gap-4">
            <div className="md:w-1/2 mb-3">
              <label className="text-xs font-semibold px-1">Price</label>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Price"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="md:w-1/2 mb-3">
              <label className="text-xs font-semibold px-1">Slot</label>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Slot"
                  {...register("slot", { required: true })}
                />
                {errors.slot && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* row 5 */}
          <div className="md:flex gap-4">
            <div className="w-full mb-3">
              <label className="text-xs font-semibold px-1">
                Test Description
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Description"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <button className=" w-[70%] text-xl text-white relative px-5 py-2 font-semibold group">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-[#32CC32] group-hover:skew-x-[18deg]"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-gradient-to-r hover:from-[#31EDAF] hover:to-[#24BAD2] group-hover:-skew-x-[18deg]"></span>

              <span className="flex items-center justify-center gap-2 relative">
                <span className="">Add Test</span>{" "}
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTest;
