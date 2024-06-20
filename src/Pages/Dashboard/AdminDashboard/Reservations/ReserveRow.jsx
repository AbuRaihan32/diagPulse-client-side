import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const ReserveRow = ({ reserve, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { _id, name, date, price, status, email } = reserve;

  // ! handle cancel
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/appointments/${_id}`)
          .then((data) => {
            if (data.data.modifiedCount > 0) {
              Swal.fire({
                title: "Canceled",
                text: "Your test has been Canceled. Please contact us to get your money back",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => console.log(err));
      }
    });
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
            .delete(`/reservation/${_id}`)
            .then((data) => {
              if (data.data.deletedCount === 1) {
                Swal.fire({
                  title: "Deleted",
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

  // ! confirm submit
  const onSubmit = (data) => {
    const { resultUrl } = data;

    const info = { resultUrl };

    // update
    axiosSecure
      .patch(`/appointments/delivery/${_id}`, info)
      .then((data) => {
        if (data.data.modifiedCount) {
          Swal.fire({
            title: "Delivered",
            text: "User has been Delivered.",
            icon: "success",
          });
          modalRef.current.close();
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "something went wrong",
          });
          modalRef.current.close();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitResult = () => {
    modalRef.current.showModal();
  };

  return (
    <>
      <tr className="text-xs">
        <th>{index + 1}</th>
        <td>{name}</td>
        <td>{email}</td>
        <td>{date}</td>
        <td>{price} $</td>
        <td>
          {status === "canceled" && (
            <span className="text-white bg-[#FF0000] py-2 rounded-full px-4">
              {status}
            </span>
          )}
          {status === "pending" && (
            <span className="text-white bg-[#FFA500] py-2 rounded-full px-4">
              {status}
            </span>
          )}
          {status === "delivered" && (
            <span className="text-white bg-[#32CD32] py-2 rounded-full px-4">
              {status}
            </span>
          )}
        </td>
        <td>
          {status === "canceled" || status === "delivered" ? (
            <button
              disabled
              className="relative border inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all rounded-full bg-gray-50 group mr-2 text-gray-300"
            >
              <span className="">Cancel</span>
            </button>
          ) : (
            <button
              onClick={handleCancel}
              className="relative border inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all rounded-full bg-[#1E3A8A] group mr-2 text-white"
            >
              <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-28 group-hover:translate-x-0"></span>
              <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
                <span className="">Cancel</span>
              </span>
            </button>
          )}
        </td>
        <td>
          {status === "delivered" || status === "canceled" ? (
            <button
              disabled
              className="relative border inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all rounded-full bg-gray-50 group mr-2 text-gray-300 w-max"
            >
              <span className="">Submit Result</span>
            </button>
          ) : (
            <button
              onClick={handleSubmitResult}
              className="relative border inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all rounded-full bg-[#1E3A8A] group mr-2 text-white w-max"
            >
              <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-28 group-hover:translate-x-0"></span>
              <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
                <span className="">Submit Result</span>
              </span>
            </button>
          )}
        </td>
        <td>
          <button
          onClick={handleDelete}
            className="relative border inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all rounded-full bg-[#1E3A8A] group mr-2 text-white w-max"
          >
            <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-28 group-hover:translate-x-0"></span>
            <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
              <span className=""><RiDeleteBin5Line></RiDeleteBin5Line></span>
            </span>
          </button>
        </td>
      </tr>

      {/* modal */}
      <dialog id="my_modal_4" className="modal md:ml-[120px]" ref={modalRef}>
        <div className="modal-box max-w-md">
          <h1 className="text-xl text-[#1E2865] text-center font-medium">
            Submit Test Result as PDF Link
          </h1>
          <form className="px-6" onSubmit={handleSubmit(onSubmit)}>
            {/* row 1 */}
            <div className="">
              <div className="mb-3">
                <label className="text-xs font-semibold px-1">
                  Result PDF Link
                </label>
                <div className="flex flex-col relative">
                  <input
                    type="text"
                    placeholder="PDF link"
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    {...register("resultUrl", { required: true })}
                  />
                  {errors.resultUrl && (
                    <span className="text-red-500 font-bold pl-3">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-around gap-4 mt-8">
              <div className="flex justify-center">
                <button className=" text-xl text-white relative px-7 md:px-10 py-2 font-semibold group">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-[#32CC32] group-hover:skew-x-[18deg]"></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-gradient-to-r hover:from-[#31EDAF] hover:to-[#24BAD2] group-hover:-skew-x-[18deg]"></span>

                  <span className="flex items-center justify-center gap-2 relative">
                    <span className="">Submit</span>{" "}
                  </span>
                </button>
              </div>
              <div className="">
                <form method="dialog" className="flex justify-center">
                  {/* if there is a button, it will close the modal */}
                  <button className="  text-xl text-white relative px-7 md:px-10 py-2 font-semibold group">
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
ReserveRow.propTypes = {
  reserve: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  index: PropTypes.number,
};

export default ReserveRow;
