import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data = {} , refetch } = useQuery({
    queryKey: ["isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  const isAdmin = data.role === "Admin";

  return { isAdmin, refetch };
};

export default useAdmin;
