import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";
import PostBox from "../components/PostBox";
import Nav from "../components/Nav";
import UploadBtn from "../components/UploadBtn";
import styled from "styled-components";
import supabase from "../supabaseClient";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  position: relative;
`;

export interface IPostData {
  id: number;
  image_URL: string;
  description: string;
  nickname: string;
  user_id: string;
  created_at: Date;
  like: string[];
}

const Home = () => {
  const userinfo = useRecoilValue(UserAtom);
  console.log(userinfo);

  const [postData, setPostData] = useState<IPostData[]>([]);

  useEffect(() => {
    let isMounted = true;

    const getPostsData = async () => {
      try {
        const { data, error } = await supabase
          .from("Posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error(error.message);
          return;
        }

        if (isMounted) {
          setPostData(data);
          console.log(data);
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
      {postData
        ? postData.map((data) => <PostBox postData={data} key={data.id} />)
        : null}
      <UploadBtn />
    </Wrapper>
  );
};

export default Home;
