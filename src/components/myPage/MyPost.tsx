import styled from "styled-components";
import { IPostData } from "../../pages/Home";
import { useState } from "react";
import DetailPost from "./DetailPost";

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #cdcdcd;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const MyPost = (postInfo: IPostData) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setDetailOpen(true);
    e.stopPropagation();
  };

  const closeDetail = () => {
    setDetailOpen(false);
  };

  return (
    <Wrapper>
      <Thumbnail
        src={JSON.parse(postInfo.image_URL)[0]}
        alt="유저 게시글 이미지"
        onClick={handleClick}
      />
      {detailOpen && (
        <DetailPost postInfo={postInfo} setDetailOpen={closeDetail} />
      )}
    </Wrapper>
  );
};

export default MyPost;
