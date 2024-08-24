import styled from "styled-components";

const Wrapper = styled.div``;

const Upload = () => {
  return (
    <Wrapper>
      <h1>새 게시물 만들기</h1>
      <input type="file" />
    </Wrapper>
  );
};

export default Upload;
