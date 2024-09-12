import styled from "styled-components";

const UserProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

interface IUserIconProps {
  userProfileSrc: string;
}

const UserIcon = ({ userProfileSrc }: IUserIconProps) => {
  return <UserProfileImg src={userProfileSrc} />;
};

export default UserIcon;
