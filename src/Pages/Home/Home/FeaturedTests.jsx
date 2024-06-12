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

  const sortedTests = allTests.sort((a, b)=> b.bookedCount - a.bookedCount);

  return (
    <div className="mt-20">
      <div className="w-[60%] mx-auto">
        <SectionHeder
          header={"Our Amazing Featured Test"}
          description={
            "We have world class pathologists & Lab assistants. We are equipped with best laboratory machinery & reagents. We ensure best quality findings."
          }
        ></SectionHeder>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-[85%] mx-auto">
        {sortedTests?.slice(0, 8).map((test) => (
          <AllTestCard key={test._id} test={test}></AllTestCard>
        ))}
      </div>

      <div className="w-full flex justify-center mt-10">
        <Link
          to={"/allTestForUser"}
          className="relative border border-[#2EE9B1] inline-flex items-center justify-start px-7 py-2 overflow-hidden font-medium transition-all rounded-full hover:bg-white group mr-2"
        >
          <span className="h-48 w-full rounded rotate-[-40deg] bg-[#2EE9B1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="flex items-center justify-center gap-2 relative text-center w-full transition-colors duration-300 ease-in-out group-hover:text-white">
            <span className="">See All Tests</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedTests;
