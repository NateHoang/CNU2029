import Main from "../components/main";
import Events from "../components/events";
import { Analytics } from "@vercel/analytics/next";

const Home = () => {
  return (
    <div className="">
      <Analytics />
      <Main></Main>
      <Events></Events>
    </div>
  );
};

export default Home;
