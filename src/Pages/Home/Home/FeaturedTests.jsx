import AllTestCard from "../../AllTestsFoUser/AllTestCard";
import SectionHeder from "../../../Components/SectionHeder";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import useTests from "../../../Hooks/useTests";

const FeaturedTests = () => {
  const { allTests, isPending, isError } = useTests();

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#32cd32"></PuffLoader>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <div className="w-full h-[500px] flex items-center justify-center font-semibold text-4xl text-center">
          <div>Something went wrong.</div>
        </div>
      </div>
    );
  }
  // if (allTests === '') {
  //   return (
  //     <div className="w-full h-[200px] flex items-center justify-center">
  //       <PuffLoader color="#32cd32"></PuffLoader>
  //     </div>
  //   );
  // }

  return (
    <div className="mt-20">
      <div className="w-[60%] mx-auto">
        <SectionHeder
          header={"our amazing featured test"}
          description={
            "We have world class pathologists & Lab assistants. We are equipped with best laboratory machinery & reagents. We ensure best quality findings."
          }
        ></SectionHeder>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-[85%] mx-auto">
        {allTests?.slice(0, 8).map((test) => (
          <AllTestCard key={test._id} test={test}></AllTestCard>
        ))}
      </div>

      <div className="w-full flex justify-center mt-10">
        <Link to={"/allTestForUser"}>
          <button className="py-3 px-10 btn hover:bg-gradient-to-r hover:from-[#0F2976] hover:to-[#2344a0] rounded-full bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] text-white ">
            See All Tests
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedTests;
