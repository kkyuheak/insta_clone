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

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Post = styled.div`
  background-color: #fff;
  width: 70%;
  height: 90%;
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
  background-color: pink;
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

const Mid = styled.div``;

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
          <Top>
            <UserIcon userProfileSrc="/images/userIcon.png" />
            <UserName>{userinfo.nickname}</UserName>
          </Top>
          <Mid></Mid>
        </Info>
      </Post>
    </Wrapper>
  );
};

export default DetailPost;
