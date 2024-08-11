import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { PieChart, Pie } from "recharts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import PropTypes from "prop-types";
import useAuth from "../../../../Hooks/useAuth";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: tests = [], isPending } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      return res.data;
    },
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appointments");
      return res.data;
    },
  });

  const pendingCount = appointments.filter((app) => app.status === "pending");
  const canceledCount = appointments.filter((app) => app.status === "canceled");
  const deliveredCount = appointments.filter(
    (app) => app.status === "delivered"
  );

  const data = [
    { name: "Delivered", value: deliveredCount.length },
    { name: "Pending", value: pendingCount.length },
    { name: "Canceled", value: canceledCount.length },
  ];

  //  ! custom chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
        Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  TriangleBar.propTypes = {
    fill: PropTypes.node,
    x: PropTypes.node,
    y: PropTypes.node,
    width: PropTypes.node,
    height: PropTypes.node,
  };

  //! Pei Chart

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <PuffLoader color="#2EE9B1"></PuffLoader>
      </div>
    );
  }


  return (
    <div className=" mt-10">
      <h1 className="text-4xl my-5">Hello {user.displayName}!</h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:border md:px-6 md:py-3 rounded-2xl">
        <div className="w-1/2">
          <div className="w-[300px] h-[300px] bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] rounded-2xl flex items-center justify-center">
            <div className="avatar">
              <div className="w-40 rounded-full">
                <img src={user.photoURL} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          {/* pie Chart */}
          <div className="flex items-start justify-center -mt-20 w-fit mx-auto -ml-10">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend></Legend>
            </PieChart>
          </div>
        </div>
      </div>

      {/* custom chart */}
      <div className="">
        <h1 className="mt-8 mb-2 text-3xl font-semibold text-center">
          Chart based on number of bookings
        </h1>
        <BarChart
          width={1000}
          height={500}
          data={tests}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 150,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-20}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12, fill: "#000" }}
          />
          <YAxis />
          <Bar
            dataKey="bookedCount"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {tests.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 6]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default AdminHome;
