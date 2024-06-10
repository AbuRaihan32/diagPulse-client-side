import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTests = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allTests = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["allTestForUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      const today = new Date();
      const filteredTests = res.data?.filter(
        (test) => new Date(test.date) >= today
      );

      return filteredTests;
    },
  });

  console.log(allTests);
  return { allTests, isPending, isError };
};

export default useTests;
