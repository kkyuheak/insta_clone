import styled from "styled-components";
import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineMessage } from "react-icons/ai";
import { FiMenu, FiSun } from "react-icons/fi";
import { useState } from "react";
import supabase from "../supabaseClient";

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
`;

const ItemIcon = styled.span``;

const ItemName = styled.p``;

const UserIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #000;
`;

const More = styled.ul``;

const MoreBox = styled.ul`
  position: absolute;
  bottom: 80px;
  margin-left: 5px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px #b1b1b1;
  width: 270px;
  /* height: 200px; */
  background-color: #fff;
  padding: 5px 10px;
`;

const MoreBoxItem = styled(NavItem)`
  font-size: 14px;
  gap: 10px;
`;

const Nav = () => {
  const [moreOpen, setMoreOpen] = useState(false);

  const handleMoreClick = () => {
    setMoreOpen((prev) => !prev);
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <TopItem>
        <NavLogo>instagram</NavLogo>
        <NavItems>
          <NavItem>
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
          <NavItem>
            <UserIcon></UserIcon>
            <ItemName>프로필</ItemName>
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
        <MoreBox>
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
