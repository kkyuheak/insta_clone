import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: rgb(240, 0, 195);
  position: fixed;
  bottom: 15px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    background-color: rgba(240, 0, 195, 0.7);
  }
`;

const UploadBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/upload");
  };
  return <Wrapper onClick={handleClick}>+</Wrapper>;
};

export default UploadBtn;
