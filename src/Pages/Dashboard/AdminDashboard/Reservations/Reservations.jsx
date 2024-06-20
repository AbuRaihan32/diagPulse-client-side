import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { PuffLoader } from "react-spinners";
import SectionHeder from "../../../../Components/SectionHeder";
import ReserveRow from "./ReserveRow";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Reservations = () => {
  const axiosSecure = useAxiosSecure();
  const [searchedRes, setSearchedRes] = useState([]);
  const [searchedEmail, setSearchedEmail] = useState("");
  const [isNotFound, setIsNotFound] = useState(false); 
  const {
    data: reservations = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments`);
      setSearchedRes(res.data);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    const email = e.target.value;
    setSearchedEmail(email);

    if (email === "") {
      setSearchedRes(reservations);
      setIsNotFound(false);
    } else {
      const filteredReservation = reservations.filter(
        (res) => res.email === email
      );

      if (filteredReservation.length > 0) {
        setSearchedRes(filteredReservation);
        setIsNotFound(false);
      } else {
        setSearchedRes([]);
        setIsNotFound(true);
      }
    }
  };

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
        header="All Reservations"
        description="Dear admin! All user's reservations are shown on this page. You can delete any reservation if you want."
      ></SectionHeder>

      <div className="w-full flex justify-end my-3">
        <div className="w-fit">
          <div className="relative inline-flex self-center ">
            <div
              className={`text-white text-xl bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] absolute -top-[2px] right-[2px] m-2 pointer-events-none p-2 rounded-full`}
            >
              <FaSearch className="text-xs"></FaSearch>
            </div>
            <input
              onChange={handleSearch}
              className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 w-[300px] pl-5 pr-10 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
              type="email"
              placeholder="Search by email"
              value={searchedEmail}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-gray-100">
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date & Time</th>
              <th>Price</th>
              <th> Status</th>
              <th> Action</th>
              <th> Action</th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {isNotFound ? (
              <tr>
                <td colSpan="6" className="text-center text-red-600">
                  Email not found
                </td>
              </tr>
            ) : (
              searchedRes.map((reserve, index) => (
                <ReserveRow
                  key={reserve._id}
                  reserve={reserve}
                  index={index}
                  refetch={refetch}
                ></ReserveRow>
              ))
            )}
            {reservations.length === 0 && !isPending && (
              <tr>
                <td colSpan="6" className="text-center">
                  No Reservation Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reservations;
