import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useBanner = () => {

    const axiosPublic = useAxiosPublic();

    const { data: bannerData = {}, isPending, isError} = useQuery({
      queryKey: ["banners"],
      queryFn: async () => {
        const res = await axiosPublic.get("/activeBanner?status=Active");
        return res.data;
      },
    });

    return {bannerData, isPending, isError}
};

export default useBanner;