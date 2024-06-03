import { useForm } from "react-hook-form";
import { BiLogInCircle } from "react-icons/bi";

const MyProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const {
      blood,
      confirmPassword,
      district,
      email,
      image,
      name,
      password,
      upazila,
    } = data;
  };

  return (
    <div>
      <h1 className=" text-8xl">My Profile</h1>
      <div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          {/* row 1 */}
          <div className="md:flex gap-4 ">
            <div className="w-full mb-3">
              <label className="text-xs font-semibold px-1">Your Name</label>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Your Name"
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
              <label className="text-xs font-semibold px-1">Your Email</label>
              <div className="flex flex-col">
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="johnsmith@example.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
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
              <label className="text-xs font-semibold px-1">Photo URL</label>
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

            <div className="md:w-1/2 mb-3">
              <label className="text-xs font-semibold px-1">Blood Group</label>
              <div className="flex flex-col">
                {/* <select
                  className="select select-bordered w-full max-w-xs"
                  {...register("blood", { required: true })}
                >
                  <option disabled selected>
                    select your blood group
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select> */}
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Your Name"
                  {...register("blood", { required: true })}
                />
                {errors.blood && (
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
              <label className="text-xs font-semibold px-1">District</label>
              <div className="flex flex-col">
                {/* <select
                className="select select-bordered w-full max-w-xs"
                {...register("district", { required: true })}
              >
                <option disabled selected>
                  select your District
                </option>
                {district.map((ds) => (
                  <option key={ds.id}>{ds.name}</option>
                ))}
              </select> */}
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Your Name"
                  {...register("district", { required: true })}
                />
                {errors.district && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="md:w-1/2 mb-3">
              <label className="text-xs font-semibold px-1">Upazila</label>
              <div className="flex flex-col">
                {/* <select
                className="select select-bordered w-full max-w-xs"
                {...register("upazila", { required: true })}
              >
                <option disabled selected>
                  select your District
                </option>
                {upazila.map((ds) => (
                  <option key={ds.id}>{ds.name}</option>
                ))}
              </select> */}
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="Your Name"
                  {...register("upazila", { required: true })}
                />
                {errors.upazila && (
                  <span className="text-red-500 font-bold pl-3">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button className=" w-[70%] text-xl text-white relative px-5 py-2 font-semibold group">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-[#32CC32] group-hover:skew-x-[18deg]"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-gradient-to-r hover:from-[#31EDAF] hover:to-[#24BAD2] group-hover:-skew-x-[18deg]"></span>

              <span className="flex items-center justify-center gap-2 relative">
                <BiLogInCircle className="text-xl"></BiLogInCircle>{" "}
                <span className="hidden md:inline">Save Change</span>{" "}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
