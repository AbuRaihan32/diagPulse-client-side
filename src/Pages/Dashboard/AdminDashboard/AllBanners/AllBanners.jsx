import { Helmet } from "react-helmet-async";
import { PuffLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SectionHeder from "../../../../Components/SectionHeder";
import BannerCard from "./BannerCard";

const AllBanners = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allBanners = [], isPending , refetch} = useQuery({
    queryKey: ["allBanners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
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

      <SectionHeder
        header={"manage all banners"}
        description={"Hi Admin! You Can Handle All Banners of Your Site"}
      ></SectionHeder>

      {allBanners?.length < 1 ? (
        <div className="w-full h-[300px] flex items-center justify-center font-semibold text-4xl">
          <div className="text-center">No Banner Available</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {allBanners.map((banner, index) => (
            <BannerCard key={banner._id} banner={banner} index={index} refetch={refetch}></BannerCard>
          ))}
        </div>
      )}
    </>
  );
};

export default AllBanners;
