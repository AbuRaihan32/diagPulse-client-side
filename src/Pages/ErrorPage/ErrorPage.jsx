import Lottie from "lottie-react";
import bg4 from "../../../public/bg4.json";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[40%] mx-auto">
        <Lottie animationData={bg4}></Lottie>
      </div>
      <Link to={'/'}>
        <button className="btn btn-accent">GO Back</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
