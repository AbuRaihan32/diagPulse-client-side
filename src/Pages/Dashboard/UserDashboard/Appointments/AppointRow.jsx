import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const AppointRow = ({ appoint, index, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { _id, name, date, price, status } = appoint;

  // ! handle delete
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

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{name}</td>
        <td>{date}</td>
        <td>{price} $</td>
        <td>
          {status === "canceled" ? (
            <span className="text-white bg-orange-500 py-2 rounded-full px-4">
              {status}
            </span>
          ) : (
            <span className="text-white bg-[#2EE2B5] py-2 rounded-full px-4">
              {status}
            </span>
          )}
        </td>
        <td>
          {status === "canceled" ? (
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
      </tr>
    </>
  );
};
AppointRow.propTypes = {
  appoint: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  index: PropTypes.number,
};

export default AppointRow;
