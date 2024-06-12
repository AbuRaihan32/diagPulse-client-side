import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { PuffLoader } from "react-spinners";
import SectionHeder from "../../../../Components/SectionHeder";
import useAuth from "../../../../Hooks/useAuth";
import ResultRow from "./ResultRow";

const TestResults = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const { data: delivered = [], isPending } = useQuery({
    queryKey: ["delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/appointments/delivered?status=delivered&email=${user.email}`
      );
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
    <SectionHeder header='All Test Results' description='The results of your booked tests are given below.'></SectionHeder>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th>No.</th>
              <th>Test Name</th>
              <th>Booked Date</th>
              <th>Price</th>
              <th>Result </th>
            </tr>
          </thead>
          <tbody>
            {delivered.map((result, index) => (
              <ResultRow
                key={result._id}
                result={result}
                index={index}
              ></ResultRow>
            ))}

            {delivered.length === 0 && !isPending && (
              <tr>
                <td colSpan="6" className="text-center">
                  No Result Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
    // <div className="mt-10">
    //   <iframe
    //     src="https://drive.google.com/file/d/1P_VVOpir76AmT-ZFq338GN3B3qEVDJn1/preview"
    //     width="100%"
    //     height="600px"
    //     style={{ border: "none" }}
    //     title="Test Result"
    //   />
    // </div>
  );
};

export default TestResults;
