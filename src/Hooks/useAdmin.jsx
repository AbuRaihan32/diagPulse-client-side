import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useAdmin = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data = {} , refetch } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  const isAdmin = data.role === "Admin";

  return { isAdmin, refetch };
};

export default useAdmin;
