import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";
import PostBox from "../components/PostBox";
import Nav from "../components/Nav";
import UploadBtn from "../components/UploadBtn";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const Home = () => {
  const userinfo = useRecoilValue(UserAtom);
  console.log(userinfo);

  return (
    <Wrapper>
      <Nav />
      <PostBox />
      <PostBox />
      <PostBox />
      <UploadBtn />
    </Wrapper>
  );
};

export default Home;
