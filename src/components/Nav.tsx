import styled from "styled-components";
import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineMessage } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

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

const Nav = () => {
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
        <NavItem>
          <ItemIcon>
            <FiMenu size={30} />
          </ItemIcon>
          <ItemName>더 보기</ItemName>
        </NavItem>
      </More>
    </Wrapper>
  );
};

export default Nav;
