import styled from "styled-components";
import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineMessage } from "react-icons/ai";
import { FiMenu, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.nav`
  width: 335px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-right: 1px solid #d0d0d0;
  position: fixed;
  background-color: #fff;

  @media screen and (max-width: 1440px) {
    width: 250px;
  }

  @media screen and (max-width: 1250px) {
    width: 70px;
    padding: 5px;
    /* align-items: center; */
  }
`;

const TopItem = styled.div``;

const NavLogo = styled.div`
  font-family: "Grey Qo", cursive;
  font-size: 50px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;

  @media screen and (max-width: 1250px) {
    display: none;
  }
`;

const NavItems = styled.ul``;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 50px;
  margin: 10px 0;
  padding: 0 10px;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }

  @media screen and (max-width: 1250px) {
    justify-content: center;
    padding: 0;
  }
`;

const ItemIcon = styled.span``;

const ItemName = styled.p`
  @media screen and (max-width: 1250px) {
    display: none;
  }
`;

const UserIcon = styled.img`
  width: 33px;
  height: 33px;
  border-radius: 50%;
`;

const More = styled.ul``;

const MoreBox = styled.ul`
  position: absolute;
  bottom: 80px;
  margin-left: 5px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px #b1b1b1;
  width: 270px;
  background-color: #fff;
  padding: 5px 10px;

  @media screen and (max-width: 1250px) {
    width: 150px;
  }
`;

const MoreBoxItem = styled(NavItem)`
  font-size: 14px;
  gap: 10px;

  @media screen and (max-width: 1250px) {
  }
`;

const Nav = () => {
  const navigate = useNavigate();

  const userInfo = useRecoilValue(UserAtom);

  const [moreOpen, setMoreOpen] = useState(false);

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMoreOpen((prev) => !prev);
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      alert("알 수 없는 오류가 발생했습니다.");
    }
    sessionStorage.removeItem("user");
    window.location.reload();
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      setMoreOpen(false);
    });

    return () => {
      window.removeEventListener("click", () => {
        setMoreOpen(false);
      });
    };
  }, []);

  const profileClick = () => {
    navigate(`/${userInfo.nickname}`);
  };

  return (
    <Wrapper>
      <TopItem>
        <NavLogo onClick={() => navigate("/")}>instagram</NavLogo>
        <NavItems>
          <NavItem onClick={() => navigate("/")}>
            <ItemIcon>
              <IoHomeSharp size={30} />
            </ItemIcon>
            <ItemName>홈</ItemName>
          </NavItem>
          <NavItem>
            <ItemIcon>
              <HiMiniMagnifyingGlass size={30} />
            </ItemIcon>
            <ItemName>검색</ItemName>
          </NavItem>
          <NavItem>
            <ItemIcon>
              <AiOutlineMessage size={30} />
            </ItemIcon>
            <ItemName>메시지</ItemName>
          </NavItem>
          <NavItem onClick={profileClick}>
            <UserIcon src="/images/userIcon.png" />
            <ItemName>{userInfo.nickname}</ItemName>
          </NavItem>
        </NavItems>
      </TopItem>
      <More>
        <NavItem onClick={handleMoreClick}>
          <ItemIcon>
            <FiMenu size={30} />
          </ItemIcon>
          <ItemName>더 보기</ItemName>
        </NavItem>
      </More>
      {moreOpen ? (
        <MoreBox
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
        >
          <MoreBoxItem>
            <ItemIcon>
              <FiSun />
            </ItemIcon>
            <ItemName>모드 전환</ItemName>
          </MoreBoxItem>
          <MoreBoxItem onClick={logOut}>로그아웃</MoreBoxItem>
        </MoreBox>
      ) : null}
    </Wrapper>
  );
};

export default Nav;
