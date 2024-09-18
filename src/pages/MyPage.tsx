import styled from "styled-components";
import Nav from "../components/Nav";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyData } from "../utility/getMyData";
import { getUserInfo } from "../utility/getUserInfo";

const Container = styled.div`
  width: calc(100vw - 335px);
  margin-left: 335px;
`;

const Main = styled.div`
  width: 920px;
  height: 100vh;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  gap: 100px;
  padding: 20px;
  padding-left: 150px;
`;

const UserImg = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const UserName = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

const UserData = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserPost = styled.li`
  font-size: 17px;
`;

const UserDescription = styled.p``;

const Posts = styled.div`
  width: 100%;
  border-top: 1px solid #c5c5c5;
`;

const Buttons = styled.ul`
  display: flex;
  gap: 30px;
  justify-content: center;
`;

const Button = styled.li<{ $isTrue?: boolean }>`
  width: 50px;
  height: 40px;
  font-size: 14px;
  border-top: ${(props) => (props.$isTrue ? "2px solid #000" : "")};
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const MyPage = () => {
  const navigate = useNavigate();

  const [locationSaved, setLocationSaved] = useState(false);

  const { userId } = useParams();
  console.log(decodeURI(decodeURIComponent(userId!)));

  const location = useLocation();

  // 유저 정보 가져오기
  const { data: userInfo, isLoading: userInfoLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () =>
      getUserInfo({ userName: decodeURI(decodeURIComponent(userId!)) }),
  });
  console.log("userInfo:", userInfo, userInfoLoading);

  // 유저 post 데이터 가져오기
  const { data: myPostData, isLoading: myPostDataLoading } = useQuery({
    queryKey: ["my_data"],
    queryFn: () =>
      getMyData({ userName: decodeURI(decodeURIComponent(userId!)) }),
  });
  console.log(myPostDataLoading, myPostData);

  useEffect(() => {
    if (location.pathname.includes("/saved")) {
      setLocationSaved(true);
    } else {
      setLocationSaved(false);
    }
  }, [location]);

  return (
    <>
      <Nav />
      <Container>
        <Main>
          <Header>
            <UserImg src="/images/userIcon.png" alt="유저 이미지" />
            <UserInfo>
              <UserName>{userInfo && userInfo[0].nickname}</UserName>
              <UserData>
                <UserPost>게시물 {myPostData?.length}</UserPost>
                <UserPost>팔로워 0</UserPost>
                <UserPost>팔로우 0</UserPost>
              </UserData>
              <UserDescription>소개</UserDescription>
            </UserInfo>
          </Header>
          <Posts>
            <Buttons>
              <Button
                onClick={() =>
                  navigate(`/${userInfo && userInfo[0].nickname}/posts`)
                }
                $isTrue={!locationSaved}
              >
                게시물
              </Button>
              <Button
                onClick={() =>
                  navigate(`/${userInfo && userInfo[0].nickname}/saved`)
                }
                $isTrue={locationSaved}
              >
                저장됨
              </Button>
            </Buttons>
          </Posts>

          <Outlet context={myPostData} />
        </Main>
      </Container>
    </>
  );
};

export default MyPage;
