import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { PuffLoader } from "react-spinners";
import AppointRow from "./AppointRow";
import SectionHeder from "../../../../Components/SectionHeder";

const Appointments = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: appointments = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments`);
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
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Appointment Name</th>
            <th>Date & Time</th>
            <th>Email</th>
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
    </>
  );
};

export default Appointments;
