import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FeaturedTests from "./FeaturedTests";
import Promotions from "./Promotions";
import Recommendation from "./Recommendation";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>DiagPulse || Home</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedTests></FeaturedTests>
      <Promotions></Promotions>
      <Recommendation></Recommendation>
    </div>
  );
};

export default Home;
