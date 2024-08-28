import styled from "styled-components";
import { MdMoreHoriz } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi2";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const Wrapper = styled.article`
  margin: 0 auto;
  width: 470px;
  height: 820px;
  padding: 10px;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #d0d0d0;
    margin-top: 25px;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #000;
  margin-right: 10px;
  cursor: pointer;
`;

const UserName = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: bold;
  margin-right: 3px;
  cursor: pointer;
`;

const PostDate = styled.p`
  font-size: 14px;
  color: #8d8d8d;
`;

const PostMenu = styled.div`
  cursor: pointer;
`;

const PostImages = styled.div`
  margin-top: 11px;
`;

const PostImg = styled.div<{ $src: string }>`
  background-color: #fff;
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 585px;
  border-radius: 5px;
`;
const PostInfo = styled.div`
  /* background-color: #cacaff; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin: 5px 0;
`;

const PostIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PostSvg = styled.svg`
  cursor: pointer;
`;

const PostIcon = styled.span`
  height: 24px;
  cursor: pointer;
`;

const PostMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostLike = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const PostTitle = styled.div`
  display: flex;
  gap: 3px;
`;

const PostDes = styled.p`
  font-size: 14px;
`;

const PostComments = styled.p`
  color: #8d8d8d;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const PostBox = () => {
  return (
    <Wrapper>
      <PostHeader>
        <UserInfo>
          <UserIcon />
          <UserName>토심이</UserName>
          <PostDate>•1일</PostDate>
        </UserInfo>
        <PostMenu>
          <MdMoreHoriz size={30} />
        </PostMenu>
      </PostHeader>

      {/* 사진 */}
      <PostImages>
        <PostImg $src="blob:http://localhost:5173/16c67ff4-0522-4460-9448-04073c4fdba1" />
      </PostImages>

      {/* 좋아요, 댓글 */}
      <PostInfo>
        <PostIcons>
          <PostSvg fill="" width={24} height={24}>
            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
          </PostSvg>
          <PostSvg width={24} height={24}>
            <path
              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </PostSvg>
          <PostIcon>
            <HiOutlineShare size={24} />
          </PostIcon>
        </PostIcons>
        <PostIcon>
          <FaRegBookmark size={24} />
        </PostIcon>
      </PostInfo>

      <PostMain>
        <PostLike>좋아요 390개</PostLike>
        <PostTitle>
          <UserName>토심이</UserName>
          <PostDes>안경을 구매하세요~!</PostDes>
        </PostTitle>
        <PostComments>댓글 27개 모두 보기</PostComments>
      </PostMain>
    </Wrapper>
  );
};

export default PostBox;
