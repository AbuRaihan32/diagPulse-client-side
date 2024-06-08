import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionHeder from "../../Components/SectionHeder";
import AllTestCard from "./AllTestCard";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PuffLoader } from "react-spinners";

const AllTestsFoUser = () => {
  const axiosSecure = useAxiosSecure();
  const [filteredTests, setFilteredTests] = useState([]);

  const {
    data: allTests = [],
    isPending,
  } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      const today = new Date();
      const filteredTests = res.data?.filter(
        (test) => new Date(test.date) >= today
      );

      return filteredTests;
    },
  });

  useEffect(() => {
    setFilteredTests(allTests);
  }, [allTests]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;

    const searchedDate = new Date(searchValue);
    searchedDate.setHours(0, 0, 0, 0);

    const filtered = allTests.filter((test) => {
      const testDate = new Date(test.date);
      testDate.setHours(0, 0, 0, 0);
      return testDate.getTime() === searchedDate.getTime();
    });

    setFilteredTests(filtered);
  };

  const handleShortBtn = (e) => {
    const selectedValue = e.target.value;
    let sortedTests = [...allTests];
    if (selectedValue === "ascending") {
      sortedTests.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (selectedValue === "descending") {
      sortedTests.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredTests(sortedTests);
  };

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#25BCCF"></PuffLoader>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="w-[85%] md:w-[60%] mx-auto">
        <SectionHeder
          header={"our amazing featured test"}
          description={
            "We have world class pathologists & Lab assistants. We are equipped with best laboratory machinery & reagents. We ensure best quality findings."
          }
        ></SectionHeder>
      </div>

      {/* search and sort */}
      <div className="md:flex justify-around mb-7">
        <div className="relative inline-flex self-center mb-5 md:mb-0">
          <div className="text-white text-xl bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] absolute -top-[2px] right-[2px] m-2 pointer-events-none p-2 rounded-full">
            <IoIosArrowDown className="text-xs"></IoIosArrowDown>
          </div>
          <select
            onChange={handleShortBtn}
            className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 w-[300px] pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none rounded-full"
          >
            <option>Sort By - </option>
            <option value="ascending">Earliest Date to Latest</option>
            <option value="descending">Latest Date Earliest</option>
          </select>
        </div>

        <div className="w-fit">
          <div className="relative inline-flex self-center ">
            <div
              className={`text-white text-xl bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] absolute -top-[2px] right-[2px] m-2 pointer-events-none p-2 rounded-full`}
            >
              <FaSearch className="text-xs"></FaSearch>
            </div>
            <input
              onChange={handleSearch}
              className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 w-[300px] pl-5 pr-10 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
              type="date"
              placeholder="Search"
              name=""
              id=""
            />
          </div>
        </div>
      </div>

      {/* search options */}
      {allTests?.length < 1 ? (
        <div className="w-full h-[500px] flex items-center justify-center font-semibold text-4xl text-center">
          <div>No test available.</div>
        </div>
      ) : (
        <>
          {filteredTests?.length < 1 ? (
            <div className="text-2xl flex items-center justify-center col-span-3 mt-8">
              <p>No available tests match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-[85%] mx-auto">
              {filteredTests.map((test) => (
                <AllTestCard key={test._id} test={test}></AllTestCard>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllTestsFoUser;
