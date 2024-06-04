import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useRef } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const TestRow = ({ user, index }) => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const { register, handleSubmit } = useForm();

  const { name, email, image, status, role, _id } = user;

  // ! handle Update
  const handleUpdate = () => {
    modalRef.current.showModal();
  };

  // ! confirm Update
  const onSubmit = (data) => {
    const { name, email, image, district, upazila, blood, status, role } = data;

    const newUser = {
      name,
      email,
      image,
      district,
      upazila,
      blood,
      status,
      role,
    };

    // update
    axiosSecure
      .put(`/updateUser/${_id}`, newUser)
      .then((data) => {
        if (data.data.modifiedCount) {
          Swal.fire({
            title: "Updated",
            text: "Your food has been updated.",
            icon: "success",
          });
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
          .delete(`/deleteUser/${_id}`)
          .then((data) => {
            if (data.data.deletedCount === 1) {
              Swal.fire({
                title: "Delete",
                text: "Your food has been Deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
            </div>
          </div>
        </td>
        <td>{email}</td>
        <td>{status}</td>
        <td>{role}</td>
        <td>
          <button
            onClick={() => handleUpdate(_id)}
            className="btn btn-circle btn-outline"
          >
            <CiEdit className="text-xl"></CiEdit>
          </button>
        </td>
        <td>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-circle btn-outline"
          >
            <RiDeleteBin6Line></RiDeleteBin6Line>
          </button>
        </td>
      </tr>

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
                    defaultValue={name}
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
                    value={email}
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
                    defaultValue={image}
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
                  <input
                    type="text"
                    defaultValue={image}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Photo URL"
                    {...register("image")}
                  />
                </div>
              </div>
            </div>

            {/* row 3 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-3">
                <label className="text-xs font-semibold px-1">District</label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={image}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Photo URL"
                    {...register("image")}
                  />
                </div>
              </div>

              <div className="md:w-1/2 mb-3">
                <label className="text-xs font-semibold px-1">Upazila</label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    defaultValue={image}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Photo URL"
                    {...register("image")}
                  />
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
    </>
  );
};

TestRow.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default TestRow;
