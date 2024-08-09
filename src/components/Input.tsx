import { Path, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { IFormValue } from "../pages/Home";

const SInput = styled.input<{
  $top: boolean;
  $bottom: boolean;
  $isError: boolean;
}>`
  width: 320px;
  height: 40px;
  border: ${(props) =>
    props.$isError ? "1px solid #db0000" : "1px solid #b3b3b3"};
  padding: 5px 10px;
  outline-color: ${(props) => (props.$isError ? "#db0000" : "#8a8a8a")};
  outline-width: thin;
  font-size: 17px;
  position: relative;

  border-radius: ${(props) => (props.$top ? "5px 5px 0 0" : "")};
  border-radius: ${(props) => (props.$bottom ? "0 0 5px 5px" : "")};

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
  min?: number;
  max?: number;
  pattern?: RegExp;
  isError: boolean;
}

const Input = ({
  type,
  placeholder,
  top = false,
  bottom = false,
  register,
  label,
  required,
  min,
  max,
  pattern,
  isError,
}: IInput) => {
  return (
    <SInput
      type={type}
      placeholder={placeholder}
      $top={top}
      $bottom={bottom}
      $isError={isError}
      {...register(label, {
        required,
        ...(min && {
          minLength: {
            value: min,
            message: `${label}의 길이는 최소 ${min}자 입니다!`,
          },
        }),
        ...(max && {
          maxLength: {
            value: max,
            message: `${label}의 길이는 최대 ${max}자 입니다!`,
          },
        }),
        ...(label === "password"
          ? pattern && {
              pattern: {
                value: pattern,
                message:
                  "비밀번호는 소문자, 대분자, 숫자, 기호를 포함해야 됩니다.",
              },
            }
          : pattern && {
              pattern: {
                value: pattern,
                message: `${label} 형식이 올바르지 않습니다!`,
              },
            }),
      })}
    />
  );
};

export default Input;
