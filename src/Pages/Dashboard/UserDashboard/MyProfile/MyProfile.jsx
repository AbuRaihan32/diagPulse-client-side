import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAdmin from "../../../../Hooks/useAdmin";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MyProfile = () => {
  const {isAdmin} = useAdmin();
  const axiosSecure = useAxiosSecure();
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const { user } = useAuth();
  const modalRef = useRef(null);
  const { register, handleSubmit } = useForm();


  console.log(isAdmin)
  //   get district
  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => {
        setDistrict(data);
      });
  }, []);

  //   get Upazila
  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazila(data);
      });
  }, []);

  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  const [openSettings, setOpenSettings] = useState(false);

  const handleEdit = () => {
    modalRef.current.showModal();
  };

  const onSubmit = (data) => {
    const { blood, district, image, name, upazila } = data;

    const updatedUser = {
      blood: blood ? blood : profile.blood,
      district: district ? district : profile.district,
      image: image ? image : profile.image,
      name: name ? name : profile.name,
      upazila: upazila ? upazila : profile.upazila,
    };

    // ! update profile
    axiosSecure.patch(`/user/${profile._id}`, updatedUser).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated",
          text: "Your Profile has been Updated.",
          icon: "success",
        });
        modalRef.current.close();
        refetch();
      }
    });
  };

  return (
    <div className="h-full bg-gray-200 p-8 ">
      {/* Profile Banner */}
      <div className="bg-white rounded-lg shadow-xl pb-8">
        {/* Three dot info */}
        <div className="absolute right-28 mt-6 rounded">
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
            title="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </button>
          {openSettings && (
            <div
              onBlur={() => setOpenSettings(false)}
              className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl"
            >
              <div className="py-2 border-b">
                <p className="text-gray-400 text-xs px-6 uppercase mb-1">
                  Settings
                </p>
                <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-700">Share Profile</span>
                </button>
                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-700">Block User</span>
                </button>
                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-700">More Info</span>
                </button>
              </div>
              <div className="py-2">
                <p className="text-gray-400 text-xs px-6 uppercase mb-1">
                  Feedback
                </p>
                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-700">Report</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full h-[250px]">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="w-full h-full rounded-tl-lg rounded-tr-lg"
            alt="Profile background"
          />
        </div>

        <div className="flex flex-col items-center -mt-20">
          <img
            src={profile.image}
            className="w-40 h-40 object-cover border-4 border-white rounded-full"
            alt="Profile"
          />
          <div className="flex items-center space-x-2 mt-2">
            {/* user Name */}
            <p className="text-2xl">{profile.name}</p>
            {/* status */}
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-100 h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
          </div>

          {/* district and up */}
          <p className="text-gray-700">
            <span>{profile.upazila}</span>, <span>{profile.district}</span>
          </p>
        </div>

        {/* contact static */}
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
              </svg>
              <span>Connect</span>
            </button>
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8 relative">
            {/* edit btn */}
            <div className="absolute right-8 top-6">
              <button
                onClick={handleEdit}
                className="bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] py-1 px-3 text-white hover:bg-gradient-to-r hover:from-[#31EDAF] hover:to-[#24BAD2] rounded-sm"
              >
                Edit
              </button>
            </div>

            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <span className="font-bold w-28">Full name:</span>
                <span className="text-gray-700">{profile.name}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-28"> Email:</span>
                <span className="text-gray-700">{profile.email}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-28">District:</span>
                <span className="text-gray-700">{profile.district}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-28">Upazila:</span>
                <span className="text-gray-700">{profile.upazila}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-28">Blood Group:</span>
                <span className="text-gray-700">{profile.blood}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-28">Image URL:</span>
                <span className="text-gray-700">{profile.image}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-28">Status:</span>
                <span className="text-gray-700">{profile.status}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* modal */}
      <dialog id="my_modal_4" className="modal md:ml-[120px]" ref={modalRef}>
        <div className="modal-box w-11/12 md:max-w-[60%]">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            {/* row 1 */}
            <div className="md:flex gap-4 ">
              <div className="w-full mb-3">
                <label className="text-xs font-semibold px-1">Your Name</label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={profile.name}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Your Name"
                    {...register("name")}
                  />
                </div>
              </div>

              <div className="w-full mb-3">
                <label className="text-xs font-semibold px-1">
                  Your Email (Not Editable)
                </label>
                <div className="flex flex-col">
                  <input
                    type="email"
                    value={profile.email}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="johnsmith@example.com"
                    {...register("email")}
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
                    defaultValue={profile.image}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Photo URL"
                    {...register("image")}
                  />
                </div>
              </div>
              <div className="md:w-1/2 mb-3 ">
                <label className="text-xs font-semibold px-1">
                  Blood Group
                </label>
                <div className="flex flex-col">
                  <select
                    className="select select-bordered w-full"
                    {...register("blood")}
                  >
                    <option selected={profile.blood === "A+"}>A+</option>
                    <option selected={profile.blood === "A-"}>A-</option>
                    <option selected={profile.blood === "B+"}>B+</option>
                    <option selected={profile.blood === "B-"}>B-</option>
                    <option selected={profile.blood === "AB+"}>AB+</option>
                    <option selected={profile.blood === "AB-"}>AB-</option>
                    <option selected={profile.blood === "O+"}>O+</option>
                    <option selected={profile.blood === "O-"}>O-</option>
                  </select>
                </div>
              </div>
            </div>

            {/* row 3 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-3">
                <label className="text-xs font-semibold px-1">District</label>
                <div className="flex flex-col">
                  <select
                    className="select select-bordered w-full"
                    {...register("district")}
                  >
                    {district.map((ds) => (
                      <option
                        key={ds.id}
                        selected={ds.name === profile.district}
                      >
                        {ds.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:w-1/2 mb-3">
                <label className="text-xs font-semibold px-1">Upazila</label>
                <div className="flex flex-col">
                  <select
                    className="select select-bordered w-full"
                    {...register("upazila")}
                  >
                    {upazila.map((ds) => (
                      <option
                        key={ds.id}
                        selected={ds.name === profile.upazila}
                      >
                        {ds.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4">
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
    </div>
  );
};

export default MyProfile;
