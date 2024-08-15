import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";

const Home = () => {
  const userinfo = useRecoilValue(UserAtom);
  console.log(userinfo);

  return <div>Home</div>;
};

export default Home;
