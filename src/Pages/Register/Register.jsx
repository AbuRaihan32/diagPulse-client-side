import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { BiLogInCircle } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import log from "../../../public/login.json";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const { createUser, logOut } = useAuth();
  const [error, setError] = useState("");
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  //   const axiosPublic = useAxiosPublic();

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

    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain an uppercase.");
    }

    if (!/[a-z]/.test(password)) {
      return setError("Password must contain a lowercase.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 character");
    }
    setError("");

    //! create user
    createUser(email, password)
      // const user = {email: email}
      .then(() => {
        Swal.fire({
          title: "Registered!",
          text: "You have been Registered Successfully.",
          icon: "success",
        });
        logOut().then(() => {
          navigate("/login");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>DiagPulse| Register</title>
      </Helmet>
      <div className="bg-cover bg-bottom bg-fixed rounded-3xl">
        <div className="bg-[#2FEBB0] bg-opacity-70 flex items-center justify-center px-5 py-5">
          <div className="bg-gray-100 bg-opacity-60 text-gray-700 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full overflow-hidden max-w-[1000px] mt-8">
            <div className="md:flex w-full">
              <div className="hidden md:flex items-center justify-center w-[40%] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] py-10 px-10">
                <Lottie animationData={log}></Lottie>
              </div>
              <div className="w-full md:w-[60%] py-10 px-5 md:px-10">
                <div className="text-center mb-3">
                  <h1 className="font-bold text-3xl text-gray-900">SIGN UN</h1>
                  <p>Enter your information to Sign In</p>
                </div>

                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  {/* row 1 */}
                  <div className="md:flex gap-4 ">
                    <div className="w-full mb-3">
                      <label className="text-xs font-semibold px-1">
                        Your Name
                      </label>
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
                      <label className="text-xs font-semibold px-1">
                        Your Email
                      </label>
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
                      <label className="text-xs font-semibold px-1">
                        Photo URL
                      </label>
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
                      <label className="text-xs font-semibold px-1">
                        Blood Group
                      </label>
                      <div className="flex flex-col">
                        <select
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
                        </select>
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
                      <label className="text-xs font-semibold px-1">
                        District
                      </label>
                      <div className="flex flex-col">
                        <select
                          className="select select-bordered w-full max-w-xs"
                          {...register("district", { required: true })}
                        >
                          <option disabled selected>
                            select your District
                          </option>
                          {district.map((ds) => (
                            <option key={ds.id}>{ds.name}</option>
                          ))}
                        </select>
                        {errors.district && (
                          <span className="text-red-500 font-bold pl-3">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="md:w-1/2 mb-3">
                      <label className="text-xs font-semibold px-1">
                        Upazila
                      </label>
                      <div className="flex flex-col">
                        <select
                          className="select select-bordered w-full max-w-xs"
                          {...register("upazila", { required: true })}
                        >
                          <option disabled selected>
                            select your District
                          </option>
                          {upazila.map((ds) => (
                            <option key={ds.id}>{ds.name}</option>
                          ))}
                        </select>
                        {errors.upazila && (
                          <span className="text-red-500 font-bold pl-3">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* row 4 */}
                  <div className="md:flex gap-4 ">
                    <div className="w-full mb-3">
                      <label className="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div className="flex flex-col relative">
                        <input
                          type={show ? "text" : "password"}
                          className="w-full pl-3 pr-12 pt-2 pb-[6px] rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="password"
                          {...register("password", { required: true })}
                        />

                        <div
                          onClick={() => setShow(!show)}
                          className="absolute right-5 top-3 text-xl"
                        >
                          {show ? (
                            <RiEyeCloseFill></RiEyeCloseFill>
                          ) : (
                            <FaEye></FaEye>
                          )}
                        </div>
                        <p className="text-red-600 font-medium text-[14px] ml-1">
                          {error}
                        </p>
                        {errors.password && (
                          <span className="text-red-500 font-bold pl-3">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-full mb-3">
                      <label className="text-xs font-semibold px-1">
                        Confirm Password
                      </label>
                      <div className="flex flex-col relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          className="w-full pl-3 pr-12 pt-2 pb-[6px] rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="confirm password"
                          {...register("confirmPassword", { required: true })}
                        />

                        <div
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-5 top-3 text-xl"
                        >
                          {showConfirm ? (
                            <RiEyeCloseFill></RiEyeCloseFill>
                          ) : (
                            <FaEye></FaEye>
                          )}
                        </div>
                        {errors.confirmPassword && (
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
                        <span className="hidden md:inline">Sign Un</span>{" "}
                      </span>
                    </button>
                  </div>
                </form>

                {/* navigator */}
                <p className="text-[16] mt-2 text-center sm:px-6 ">
                  Do Not have an account?
                  <Link
                    to={"/register"}
                    rel="noopener noreferrer"
                    href="#"
                    className="underline text-blue-600"
                  >
                    {" "}
                    Register{" "}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
