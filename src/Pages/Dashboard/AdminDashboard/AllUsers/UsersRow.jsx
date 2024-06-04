import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useRef } from "react";
import Swal from "sweetalert2";
import PropTypes from 'prop-types'

const UsersRow = ({ user, index }) => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { name, email, image, status, role, _id } =
    user;

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
      <dialog id="my_modal_4" className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-[60%]">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            {/* row 1 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">Food Name</label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full py-2 pl-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Food Name"
                    // defaultValue={foodName}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500 font-bold pl-3">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">Photo URL</label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full py-2 pl-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Photo URL"
                    // defaultValue={foodImage}
                    {...register("image", { required: true })}
                  />
                  {errors.image && (
                    <span className="text-red-500 font-bold pl-3">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* row 2 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">
                  Food Quantity
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full py-2 pl-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Food Quantity"
                    // defaultValue={quantityAvailable}
                    {...register("quantity", { required: true })}
                  />
                  {errors.quantity && (
                    <span className="text-red-500 font-bold pl-3">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">
                  Pickup Location
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full pl-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Pickup Location"
                    // defaultValue={pickupLocation}
                    {...register("location", { required: true })}
                  />
                  {errors.location && (
                    <span className="text-red-500 font-bold pl-3">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* row 3 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">
                  Expired Date/Time
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full py-2 pl-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Expired Date"
                    // defaultValue={expiryDateTime}
                    {...register("date", { required: true })}
                  />
                  {errors.location && (
                    <span className="text-red-500 font-bold pl-3">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">
                  Additional Notes
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full py-2 pl-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Additional Notes"
                    // defaultValue={additionalNotes}
                    {...register("notes")}
                  />
                </div>
              </div>
            </div>

            {/* row 4 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">
                  Food Status
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full py-2 pl-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Food Status"
                    // value={foodStatus}
                    {...register("status")}
                  />
                </div>
              </div>

              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">
                  Donator Image
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full pl-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Donator photo URL"
                    // defaultValue={donatorImage}
                    {...register("donatorImage")}
                  />
                </div>
              </div>
            </div>

            {/* row 6 */}
            <div className="md:flex gap-4">
              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">
                  Donator Name
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full pl-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Donator Name"
                    // defaultValue={donatorName}
                    {...register("donatorName")}
                  />
                </div>
              </div>

              <div className="md:w-1/2 mb-5">
                <label className="text-xs font-semibold px-1">
                  Donator Email
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full pl-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Donator Email"
                    // defaultValue={donatorEmail}
                    {...register("donatorEmail", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 flex justify-center">
                <button className=" w-[60%] text-xl text-white relative px-5 py-2 font-semibold group">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] bg-[#188d18] group-hover:bg-[#32CC32] group-hover:skew-x-[18deg]"></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] bg-[#32CC32] group-hover:bg-[#188d18] group-hover:-skew-x-[18deg]"></span>

                  <span className="flex items-center justify-center gap-2 relative">
                    <span>Save Update</span>{" "}
                  </span>
                </button>
              </div>
              <div className="w-1/2">
                <form method="dialog" className="flex justify-center">
                  {/* if there is a button, it will close the modal */}
                  <button className="w-[60%] text-xl text-white relative px-5 py-2 font-semibold group">
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] bg-[#188d18] group-hover:bg-[#32CC32] group-hover:skew-x-[18deg]"></span>
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] bg-[#32CC32] group-hover:bg-[#188d18] group-hover:-skew-x-[18deg]"></span>

                    <span className="flex items-center justify-center gap-2 relative">
                      <span>Close</span>{" "}
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

UsersRow.propTypes ={
    user: PropTypes.object.isRequired,
    index: PropTypes.number,
  }

export default UsersRow;
