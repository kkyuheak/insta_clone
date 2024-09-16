import styled from "styled-components";
import { IPostData } from "../../pages/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../atom";
import UserIcon from "../user/UserIcon";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Post = styled.div`
  background-color: #fff;
  width: 70%;
  height: 95%;
  display: flex;
`;

const PostImages = styled.div`
  width: 70%;
  height: 100%;
  flex-shrink: 0;
`;

const Image = styled.div<{ $src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: #fff;
  border: 1px solid #cdcdcd;
`;

const SwiperStyle = styled(Swiper)`
  height: 100%;

  .swiper-button-next,
  .swiper-button-prev {
    color: black;
    background-color: rgba(255, 255, 255, 0.8);
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .swiper-button-next::after {
    font-size: 15px;
  }

  .swiper-button-prev::after {
    font-size: 15px;
  }
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Top = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 10px;
  border-bottom: 1px solid #d9d9d9;
`;

const UserName = styled.p`
  color: #000;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
`;

const Mid = styled.div`
  height: 80%;
`;

const PostDescription = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 10px;
  height: 60px;
`;

const Desc = styled.p``;

const Comments = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 15px;
  background-color: #fff;
  height: 55px;
  margin-top: 10px;
`;

const Comment = styled.p`
  font-size: 14px;
`;

const CloseBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  position: absolute;
  top: 15px;
  right: 15px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    transition: all 0.3s;
  }
`;

interface IDetailPostProps {
  postInfo: IPostData;
  setDetailOpen: () => void;
}

const DetailPost = ({ postInfo, setDetailOpen }: IDetailPostProps) => {
  const imageUrl: string[] = JSON.parse(postInfo.image_URL);

  const userinfo = useRecoilValue(UserAtom);

  const handlePostClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener("wheel", (e) => e.preventDefault(), {
      passive: false,
    });

    return () => {
      window.addEventListener("wheel", (e) => e.preventDefault());
    };
  }, []);

  return (
    <Wrapper onClick={setDetailOpen}>
      <Post onClick={handlePostClick}>
        {/* img */}
        <PostImages>
          <SwiperStyle
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
          >
            {imageUrl.map((url, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image $src={url} />
                </SwiperSlide>
              );
            })}
          </SwiperStyle>
        </PostImages>

        {/* infoBox */}
        <Info>
          {/* 게시글 유저 정보 */}
          <Top>
            <UserIcon userProfileSrc="/images/userIcon.png" />
            <UserName>{userinfo.nickname}</UserName>
          </Top>

          <Mid>
            {/* 게시글 설명 */}
            <PostDescription>
              <UserIcon userProfileSrc="/images/userIcon.png" />
              <UserName>{userinfo.nickname}</UserName>
              <Desc>{postInfo.description}</Desc>
            </PostDescription>

            {/* 임시 댓글 */}
            <Comments>
              <UserIcon userProfileSrc="/images/userIcon.png" />
              <UserName>{userinfo.nickname}</UserName>
              <Comment>댓글1</Comment>
            </Comments>
          </Mid>
        </Info>
      </Post>
      <CloseBtn>
        <IoClose size={40} />
      </CloseBtn>
    </Wrapper>
  );
};

export default DetailPost;
