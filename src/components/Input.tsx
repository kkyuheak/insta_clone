import { motion } from "framer-motion";
import { Path, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { IFormValue } from "../pages/Home";

const SInput = styled(motion.input)<{
  $top: boolean;
  $bottom: boolean;
  $middle: boolean;
}>`
  width: 320px;
  height: 40px;
  border: 1px solid #b3b3b3;
  padding: 5px 10px;
  outline-color: #8a8a8a;
  outline-width: thin;
  font-size: 17px;
  position: relative;

  border-radius: ${(props) => (props.$top ? "5px 5px 0 0" : "")};
  border-radius: ${(props) => (props.$bottom ? "0 0 5px 5px" : "")};
  border-top: ${(props) => (!props.$bottom && !props.$top ? 0 : "")};
  border-bottom: ${(props) => (!props.$bottom && !props.$top ? 0 : "")};
  border-bottom: ${(props) => (props.$middle ? "1px solid #b3b3b3" : "")};

  &::placeholder {
    font-size: 14px;
    transition: all 0.2s;
  }

  &:focus {
    &::placeholder {
      font-size: 10px;
      position: absolute;
      top: 5px;
      transition: all 0.3s;
    }
  }
`;

interface IInput {
  type: string;
  placeholder: string;
  top?: boolean;
  bottom?: boolean;
  middle?: boolean;
  register: UseFormRegister<IFormValue>;
  label: Path<IFormValue>;
  required?: boolean;
}

const Input = ({
  type,
  placeholder,
  top = false,
  bottom = false,
  middle = false,
  register,
  label,
  required,
}: IInput) => {
  return (
    <SInput
      type={type}
      placeholder={placeholder}
      $top={top}
      $bottom={bottom}
      $middle={middle}
      {...register(label, { required })}
    />
  );
};

export default Input;
