import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { PuffLoader } from "react-spinners";
import ProCard from "./ProCard";
import SectionHeder from "../../../Components/SectionHeder";

const Promotions = () => {
  const axiosPublic = useAxiosPublic();

  const { data: promotions = [], isPending } = useQuery({
    queryKey: ["promotions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/promotions");
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
    <section className="mt-14 w-[85%] mx-auto">
      <div className="text-center">
        <SectionHeder
          header={"Promotions"}
          description="Stay informed on our latest promotions, ensuring you maximize value
          for your practice while seizing opportunities for growth and
          innovation"
        ></SectionHeder>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {promotions.map((pro, index) => (
          <ProCard key={pro._id} pro={pro} index={index}></ProCard>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
