import { Helmet } from "react-helmet-async";
import { PuffLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UsersRow from "./UsersRow";
import SectionHeder from '../../../../Components/SectionHeder'

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], refetch, isPending } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get('/users') 
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
      <Helmet>
        <title>DiagPulse || All Users</title>
      </Helmet>

      <SectionHeder header={'Manage All Users'}  description={'Hi Admin! You Can Handle All Users of Your Site'}></SectionHeder>

      {allUsers?.length < 1 ? (
        <div className="w-full h-[300px] flex items-center justify-center font-semibold text-4xl">
          <div className="text-center">No User Available</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Image & Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>Update</th>
                <th> Delete </th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user, index) => (
                <UsersRow
                  key={user._id}
                  user={user}
                  refetch={refetch}
                  index={index}
                ></UsersRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllUsers;
