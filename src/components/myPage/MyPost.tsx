import styled from "styled-components";
import { IPostData } from "../../pages/Home";

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #cdcdcd;

  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;

  &:hover {
    opacity: 0.5;
  }
`;

const MyPost = (postInfo: IPostData) => {
  console.log(postInfo);

  return (
    <Wrapper>
      <Thumbnail
        src={JSON.parse(postInfo.image_URL)[0]}
        alt="유저 게시글 이미지"
      />
    </Wrapper>
  );
};

export default MyPost;
