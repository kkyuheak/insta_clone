import styled from "styled-components";
import { IPostData } from "../../pages/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

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
`;

const PostImages = styled.div`
  width: 70%;
  height: 100%;
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

const DetailPost = (postInfo: IPostData) => {
  const imageUrl: string[] = JSON.parse(postInfo.image_URL);

  return (
    <Wrapper>
      <Post>
        {/* img */}
        <PostImages>
          <Swiper
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
          </Swiper>
        </PostImages>
        {/* infoBox */}
      </Post>
    </Wrapper>
  );
};

export default DetailPost;
