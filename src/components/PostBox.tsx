import styled from "styled-components";
import { MdMoreHoriz } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi2";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { IPostData } from "../pages/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import supabase from "../supabaseClient";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";
import { useEffect, useState } from "react";

const Wrapper = styled.article`
  margin: 0 auto;
  width: 470px;
  height: 820px;
  padding: 10px;
  box-shadow: 0px 0px 10px #b5b5b5;
  border-radius: 10px;
  margin-top: 5px;

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
  background-color: #f8f8f8;
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 560px;
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

interface IPostBoxProps {
  postData: IPostData;
}

const SwiperStyle = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    color: black;
    background-color: rgba(255, 255, 255, 0.8);
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .swiper-button-next::after {
    font-size: 15px;
  }

  .swiper-button-prev::after {
    font-size: 15px;
  }
`;
const PostBox = ({ postData }: IPostBoxProps) => {
  const [likePost, setLikePost] = useState(false);

  const userInfo = useRecoilValue(UserAtom);

  const imgSrc: string[] = JSON.parse(postData.image_URL);

  useEffect(() => {
    if (postData.like) {
      const isLike = postData.like.includes(userInfo.id);
      console.log(postData.id, isLike);
      if (isLike) {
        setLikePost(true);
      }
    }
  }, []);

  const likeClick = async (likePost: boolean) => {
    if (!likePost) {
      const { error } = await supabase
        .from("Posts")
        .update({ like: [...postData.like, userInfo.id] })
        .eq("id", postData.id);

      if (error) {
        console.error(error);
        alert("알 수 없는 오류가 발생했습니다.");
        return;
      }
    } else {
      const { error } = await supabase
        .from("Posts")
        .update({ like: [] })
        .eq("id", postData.id);

      if (error) {
        console.error(error);
        alert("알 수 없는 오류가 발생했습니다.");
        return;
      }
    }
  };

  return (
    <Wrapper>
      <PostHeader>
        <UserInfo>
          <UserIcon />
          <UserName>{postData.nickname}</UserName>
          <PostDate>•1일</PostDate>
        </UserInfo>
        <PostMenu>
          <MdMoreHoriz size={30} />
        </PostMenu>
      </PostHeader>

      {/* 사진 */}
      <PostImages>
        <SwiperStyle
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
        >
          {imgSrc.map((src, i) => {
            return (
              <SwiperSlide key={i}>
                <PostImg $src={src} />
              </SwiperSlide>
            );
          })}
        </SwiperStyle>
      </PostImages>

      {/* 좋아요, 댓글 */}
      <PostInfo>
        <PostIcons>
          {/* 좋아요 */}
          <PostSvg
            fill={likePost ? "red" : ""}
            width={24}
            height={24}
            onClick={() => likeClick(likePost)}
            viewBox={likePost ? "0 0 48 48" : "0 0 24 24"}
          >
            {likePost ? (
              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            ) : (
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            )}
          </PostSvg>

          {/* 댓글 */}
          <PostSvg width={24} height={24}>
            <path
              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </PostSvg>

          {/* 공유하기 */}
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
          <UserName>{postData.nickname}</UserName>
          <PostDes>{postData.description}</PostDes>
        </PostTitle>
        <PostComments>댓글 27개 모두 보기</PostComments>
      </PostMain>
    </Wrapper>
  );
};

export default PostBox;
