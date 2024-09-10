import styled from "styled-components";
import MyPost from "./MyPost";
import { IPostData } from "../../pages/Home";
import { useQuery } from "@tanstack/react-query";
import { getMyData } from "../../utility/getMyData";
import { UserAtom } from "../../atom";
import { useRecoilValue } from "recoil";

const MyPosts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  gap: 5px;
  margin-top: 10px;
`;

const UserPosts = () => {
  const userinfo = useRecoilValue(UserAtom);

  // 유저 post 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["my_data"],
    queryFn: () => getMyData({ userName: userinfo.nickname }),
  });
  console.log(isLoading, data);

  return (
    <MyPosts>
      {data?.map((postInfo: IPostData) => {
        return <MyPost {...postInfo} key={postInfo.id}></MyPost>;
      })}
    </MyPosts>
  );
};

export default UserPosts;
