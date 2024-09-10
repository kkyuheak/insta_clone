import styled from "styled-components";
import MyPost from "./MyPost";
import { IPostData } from "../../pages/Home";
import { useOutletContext } from "react-router-dom";

const MyPosts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  gap: 5px;
  margin-top: 10px;
`;

const UserPosts = () => {
  const myPostData: IPostData[] = useOutletContext();
  console.log(myPostData);

  return (
    <MyPosts>
      {myPostData?.map((postInfo: IPostData) => {
        return <MyPost {...postInfo} key={postInfo.id}></MyPost>;
      })}
    </MyPosts>
  );
};

export default UserPosts;
