import styled from "styled-components";

const SButton = styled.button<{ $width: string }>`
  width: ${(props) => props.$width};
  padding: 10px 0;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  color: #fff;
  background-color: rgb(15, 127, 244);
  cursor: pointer;
  margin-top: 10px;
`;

interface IButton {
  children: React.ReactNode;
  width: string;
}
const Button = ({ children, width }: IButton) => {
  return <SButton $width={width}>{children}</SButton>;
};

export default Button;
