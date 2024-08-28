import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";
import PostBox from "../components/PostBox";
import Nav from "../components/Nav";
import UploadBtn from "../components/UploadBtn";
import styled from "styled-components";
import supabase from "../supabaseClient";
import { useEffect } from "react";

const Wrapper = styled.div`
  position: relative;
`;

const Home = () => {
  const userinfo = useRecoilValue(UserAtom);
  console.log(userinfo);

  useEffect(() => {
    let isMounted = true;

    const getPostsData = async () => {
      try {
        const { data, error } = await supabase.from("Posts").select("*");

        if (error) {
          console.error(error.message);
          return;
        }

        if (isMounted) {
          console.log(data);
          // console.log(JSON.parse(data[0].image_URL));
        }
      } catch (err) {
        console.log(err);
      }

      return () => {
        isMounted = false;
      };
    };

    getPostsData();
  }, []);

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
