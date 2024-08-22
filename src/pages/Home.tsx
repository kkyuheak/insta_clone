import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";
import PostBox from "../components/PostBox";

const Home = () => {
  const userinfo = useRecoilValue(UserAtom);
  console.log(userinfo);

  return (
    <div>
      <PostBox />
      <PostBox />
      <PostBox />
    </div>
  );
};

export default Home;
