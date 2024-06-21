import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: isAdmin,
    refetch,
    isPending,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = user && await axiosSecure.get(`/users/admin?email=${user?.email}`);
      return res.data;
    },
  });
  return { isAdmin, refetch, isPending };
};

export default useAdmin;
