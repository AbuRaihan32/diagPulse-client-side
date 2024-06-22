import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const InfoRow = ({ email }) => {
  const axiosSecure = useAxiosSecure();
  const { data: specificAppointments = [] } = useQuery({
    queryKey: [email, "specificAppointments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`appointments/search?email=${email}`);
      return res.data;
    },
  });

  return (
    <>
      {specificAppointments.length < 1 ? (
        <p className="text-center">No test booked</p>
      ) : (
        <div className="text-xs md:text-[16px]">
          <div className="grid grid-cols-10 text-center gap-3">
            <div className="font-bold w-fit">NO </div>
            <div className="font-bold col-span-2">Name</div>
            <div className="font-bold col-span-2">Price</div>
            <div className="font-bold col-span-2">Status</div>
            <div className="font-bold col-span-2">Date</div>
          </div>
          {specificAppointments.map((app, index) => (
            <>
              <div className="grid grid-cols-10 items-center text-center mt-3 gap-3">
                <div className="w-fit">{index + 1}. </div>
                <div className="col-span-2">{app.name}</div>
                <div className="col-span-2">{app.price}</div>
                <div className="col-span-2">{app.status}</div>
                <div className="col-span-2">{app.date}</div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

InfoRow.propTypes = {
  email: PropTypes.node,
};

export default InfoRow;
