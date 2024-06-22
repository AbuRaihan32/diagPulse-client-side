import SectionHeder from "../../Components/SectionHeder";
import AllTestCard from "./AllTestCard";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PuffLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigation } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllTestsFoUser = () => {
  const axiosSecure = useAxiosSecure();
  const [filteredTests, setFilteredTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();
  const { count } = useLoaderData();
  const itemsPerPage = 4;
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const {
    data: allTests = [],
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["allTestForUsers", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allTests?page=${currentPage}&size=${itemsPerPage}`
      );
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

  if (isPending || isLoading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#25BCCF"></PuffLoader>
      </div>
    );
  }
  if (navigation.state === "loading") {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#25BCCF"></PuffLoader>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <Helmet>
        <title>DiagPulse || All Tests</title>
      </Helmet>
      <div className="w-[85%] md:w-[60%] mx-auto">
        <SectionHeder
          header={"All Amazing Test"}
          description={
            "We have world class pathologists & Lab assistants. We are equipped with best laboratory machinery & reagents. We ensure best quality findings."
          }
        ></SectionHeder>
      </div>

      {/* search and sort */}
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-evenly gap-3 mb-7 ">
        <div className="relative inline-flex self-center">
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

      {allTests?.length < 1 ? (
        <div className="w-full h-[500px] flex items-center justify-center font-semibold text-4xl text-center">
          <div>No test available.</div>
        </div>
      ) : (
        <>
          {!filteredTests?.length && !isPending ? (
            <div className="text-2xl flex items-center justify-center col-span-3 mt-8">
              <p>No available tests match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[85%] mx-auto">
              {filteredTests.map((test) => (
                <AllTestCard key={test._id} test={test}></AllTestCard>
              ))}
            </div>
          )}
        </>
      )}

      <div className="mx-auto w-fit mt-10">
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          className="px-3 py-2 bg-gray-200 rounded-lg text-black font-semibold"
        >
          «
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? "bg-blue-800 text-white px-3 py-2 rounded-lg font-semibold ml-2"
                : "px-3 py-2 bg-gray-200 rounded-lg text-black font-semibold ml-2 "
            }
            key={page}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            currentPage < pages.length - 1 && setCurrentPage(currentPage + 1)
          }
          className="px-3 py-2 bg-gray-200 rounded-lg text-black font-semibold ml-2"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default AllTestsFoUser;
