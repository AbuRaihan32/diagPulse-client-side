import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { PuffLoader } from "react-spinners";
import AppointRow from "./AppointRow";
import SectionHeder from "../../../../Components/SectionHeder";
import useAuth from "../../../../Hooks/useAuth";

const Appointments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: appointments = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/appointments/search?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#32cd32"></PuffLoader>
      </div>
    );
  }

  return (
    <>
      <SectionHeder
        header="Upcoming Appointments"
        description="All test cases that you have paid and booked are displayed here"
      ></SectionHeder>

      {appointments?.length < 1 ? (
        <div className="w-full h-[300px] flex items-center justify-center font-semibold text-4xl">
          <div className="text-center">No Appointment Available</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Appointment Name</th>
                <th>Date & Time</th>
                <th>Price</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appoint, index) => (
                <AppointRow
                  key={appoint._id}
                  appoint={appoint}
                  index={index}
                  refetch={refetch}
                ></AppointRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Appointments;
