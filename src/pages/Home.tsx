import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";
import PostBox from "../components/PostBox";
import Nav from "../components/Nav";

const Home = () => {
  const userinfo = useRecoilValue(UserAtom);
  console.log(userinfo);

  return (
    <div>
      <Nav />
      <PostBox />
      <PostBox />
      <PostBox />
    </div>
  );
};

export default Home;
