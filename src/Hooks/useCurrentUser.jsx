import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCurrentUser = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();

    const { data: currentUser = {} , isPending} = useQuery({
      queryKey: [user?.email, "currentUser"],
      enabled: !loading,
      queryFn: async () => {
        const res = await axiosSecure.get(`/user?email=${user.email}`);
        return res.data;
      },
    });
  

    return {currentUser, isPending}
};

export default useCurrentUser;