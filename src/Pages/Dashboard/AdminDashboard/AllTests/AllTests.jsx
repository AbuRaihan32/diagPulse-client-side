import { Helmet } from "react-helmet-async";
import { PuffLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import TestRow from "./TestRow";
import SectionHeder from "../../../../Components/SectionHeder";

const AllTests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allTests = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#2EE9B1"></PuffLoader>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>DiagPulse || All Tests</title>
      </Helmet>

      <SectionHeder
        header={"Manage All Tests"}
        description={"Hi Admin! You Can Handle All tests added by admins"}
      ></SectionHeder>

      {allTests?.length < 1 ? (
        <div className="w-full h-[300px] flex items-center justify-center font-semibold text-4xl">
          <div className="text-center">No Test Available</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Image & Name</th>
                <th>Category</th>
                <th>Sample Type</th>
                <th>Purpose</th>
                <th>Update</th>
                <th>Delete </th>
                <th>Reservations </th>
              </tr>
            </thead>
            <tbody>
              {allTests.map((test, index) => (
                <TestRow
                  key={test._id}
                  test={test}
                  index={index}
                  refetch={refetch}
                ></TestRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllTests;

