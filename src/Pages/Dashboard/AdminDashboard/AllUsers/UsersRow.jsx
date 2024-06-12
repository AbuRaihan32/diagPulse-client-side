import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import SectionHeder from "../../../../Components/SectionHeder";

const UsersRow = ({ user, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const modalRef1 = useRef(null);
  const modalRef2 = useRef(null);
  const printRef = useRef();

  const isAdmin = user.role === "Admin";
  const isActive = user.status === "Active";

  const [changeRole, setChangeRole] = useState(isAdmin);
  const [changeStatus, setChangeStatus] = useState(isActive);

  const { register, handleSubmit } = useForm();

  const { _id, name, email, image, district, upazila, blood, status, role } =
    user;

  // ! handle Update
  const handleUpdate = () => {
    modalRef1.current.showModal();
  };

  const handleDownload = () => {
    modalRef2.current.showModal();
  };

  const downloadPDF = () => {
    const input = printRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("user-details.pdf");
      })
      .catch((err) => console.log(err));
  };

  // ! confirm Update
  const onSubmit = (data) => {
    const { status, role } = data;

    console.log(data);
    const info = { status, role };

    // update
    axiosSecure
      .patch(`/updateUser/${_id}`, info)
      .then((data) => {
        if (data.data.modifiedCount) {
          Swal.fire({
            title: "Updated",
            text: "User has been updated.",
            icon: "success",
          });
          modalRef1.current.close();
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You didn't make any changes",
          });
          modalRef1.current.close();
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
        <td>
          <Link onClick={handleDownload}>
            <button className="btn btn-outline">See User Info</button>
          </Link>
        </td>
      </tr>

      {/* modal */}
      <dialog id="my_modal_4" className="modal md:ml-[120px]" ref={modalRef1}>
        <div className="modal-box max-w-md">
          <h1 className="text-xl text-[#1E2865] text-center font-medium">
            Change Role And Status
          </h1>
          <form className="px-6" onSubmit={handleSubmit(onSubmit)}>
            {/* row 1 */}
            <div className="">
              <div className="mb-3">
                <label className="text-xs font-semibold px-1">Role</label>
                <div className="flex flex-col relative">
                  <input
                    type="text"
                    value={changeRole ? "Admin" : "User"}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    {...register("role")}
                  />
                  <div
                    onClick={() => setChangeRole(!changeRole)}
                    className="absolute right-2 top-[4px] text-xl"
                  >
                    <span className="p-[6px] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] rounded-md text-xs text-white cursor-pointer">
                      {" "}
                      Change{" "}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="text-xs font-semibold px-1">Status</label>
                <div className="flex flex-col relative">
                  <input
                    type="text"
                    value={changeStatus ? "Active" : "Blocked"}
                    className="w-full py-2 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    {...register("status")}
                  />
                  <div
                    onClick={() => setChangeStatus(!changeStatus)}
                    className="absolute right-2 top-[4px] text-xl"
                  >
                    <span className="p-[6px] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] rounded-md text-xs text-white cursor-pointer">
                      {" "}
                      Change{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-around gap-4 mt-8">
              <div className="flex justify-center">
                <button className=" text-xl text-white relative px-7 md:px-10 py-2 font-semibold group">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-[#32CC32] group-hover:skew-x-[18deg]"></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-[18deg] bg-gradient-to-r from-[#24BAD2] to-[#31EDAF] group-hover:bg-gradient-to-r hover:from-[#31EDAF] hover:to-[#24BAD2] group-hover:-skew-x-[18deg]"></span>

                  <span className="flex items-center justify-center gap-2 relative">
                    <span className="">Save</span>{" "}
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

      {/* modal 2 */}
      <dialog id="my_modal_4" className="modal md:ml-[120px]" ref={modalRef2}>
        <div className="modal-box w-11/12 md:max-w-[60%] ">
          <div className="w-full " ref={printRef}>
            <div className="w-full px-5 md:px-10">
              <SectionHeder header="User Details Info"></SectionHeder>
              <div>
                {/* row 1 */}
                <div className="md:flex gap-4">
                  <div className="w-full mb-3">
                    <label className="text-xs font-semibold px-1">
                      Your Name
                    </label>
                    <div className="flex flex-col border py-2">
                      <p className="w-full py-2 px-3 rounded-lg  border-gray-200">
                        {name}
                      </p>
                    </div>
                  </div>

                  <div className="w-full mb-3">
                    <label className="text-xs font-semibold px-1">
                      Your Email
                    </label>
                    <div className="flex flex-col border py-2">
                      <p className="w-full py-2 px-3 rounded-lg  border-gray-200">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* row 2 */}
                <div className="md:flex gap-4">
                  <div className="w-full mb-3">
                    <label className="text-xs font-semibold px-1">
                      Photo URL
                    </label>
                    <div className="flex flex-col border py-2">
                      <p className="w-full py-2 px-3 rounded-lg  border-gray-200">
                        {image}
                      </p>
                    </div>
                  </div>
                </div>

                {/* row 3 */}
                <div className="md:flex gap-4">
                  <div className="md:w-1/2 mb-3">
                    <label className="text-xs font-semibold px-1">
                      District
                    </label>
                    <div className="flex flex-col border py-2">
                      <p className="w-full py-2 px-3 rounded-lg  border-gray-200">
                        {district}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-1/2 mb-3">
                    <label className="text-xs font-semibold px-1">
                      Upazila
                    </label>
                    <div className="flex flex-col border py-2">
                      <p className="w-full py-2 px-3 rounded-lg  border-gray-200">
                        {upazila}
                      </p>
                    </div>
                  </div>
                </div>

                {/* row 4 */}
                <div className="md:flex gap-4">
                  <div className="md:w-1/2 mb-3">
                    <label className="text-xs font-semibold px-1">Status</label>
                    <div className="flex flex-col border py-2">
                      <p className="w-full py-2 px-3 rounded-lg  border-gray-200">
                        {status}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-1/2 mb-3">
                    <label className="text-xs font-semibold px-1">
                      Blood Group
                    </label>
                    <div className="flex flex-col border py-2">
                      <p className="w-full py-2 px-3 rounded-lg  border-gray-200">
                        {blood}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-1/2 mb-3">
                    <label className="text-xs font-semibold px-1">Role</label>
                    <div className="flex flex-col border py-2">
                      <p className="w-full py-2 px-3 rounded-lg  border-gray-200">
                        {role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-around gap-4 mt-8">
                <button
                  type="button"
                  onClick={downloadPDF}
                  className="relative border inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all rounded-full bg-[#0F2976] group mr-2 text-white"
                >
                  <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
                    <span className="flex items-center gap-2">
                      <FaFileDownload />
                      <span> Download info </span>
                    </span>
                  </span>
                </button>
                <div className="">
                  <form method="dialog" className="flex justify-center">
                    {/* if there is a button, it will close the modal */}
                    <button className="relative border inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all rounded-full bg-[#0F2976] group mr-2 text-white">
                      <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:-ml-2 group-hover:mb-32 group-hover:translate-x-0"></span>
                      <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
                        <span className="flex items-center gap-2">
                          <span> close </span>
                        </span>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

UsersRow.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number,
  refetch: PropTypes.func,
};

export default UsersRow;
