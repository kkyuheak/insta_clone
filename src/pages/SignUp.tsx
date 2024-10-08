import styled from "styled-components";
import {
  Form,
  HomeLogo,
  Icon,
  IFormValue,
  Line,
  LoginIcons,
  NoAccount,
} from "./LoginPage";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import supabase from "../supabaseClient";
import { useState } from "react";

const Wrapper = styled.div``;

const SignUpForm = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  padding: 30px 0;
  width: 400px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
`;

export const ErrorMessage = styled.p`
  font-size: 17px;
  text-align: center;
  margin-bottom: 10px;
  color: #d10000;
`;

export const SInput = styled.input<{
  $top?: boolean;
  $bottom?: boolean;
  $isError?: boolean;
}>`
  width: 320px;
  height: 40px;
  border: ${(props) =>
    props.$isError ? "1px solid #db0000" : "1px solid #b3b3b3"};
  padding: 5px 10px;
  outline-color: ${(props) => (props.$isError ? "#db0000" : "#8a8a8a")};
  outline-width: thin;
  font-size: 17px;

  border-radius: ${(props) => (props.$top ? "5px 5px 0 0" : "")};
  border-radius: ${(props) => (props.$bottom ? "0 0 5px 5px" : "")};

  &::placeholder {
    font-size: 14px;
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

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState<string | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormValue>();

  const onSubmit: SubmitHandler<IFormValue> = async (inputData) => {
    try {
      setLoading(true);
      if (inputData.password !== inputData.checkPassword) return;
      console.log(inputData.password);

      const { data: db, error: dbError } = await supabase
        .from("user")
        .select("nickname");

      console.log("db: ", db, dbError);

      if (db) {
        const isNickNameExists = db.some(
          (item) => item.nickname === inputData.nickname
        );
        if (isNickNameExists) {
          setSignInError("해당 닉네임이 존재합니다.");
          return;
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email: inputData.email,
        password: inputData.password + "",
        options: {
          data: {
            nickname: inputData.nickname,
          },
        },
      });

      console.log(data, error);

      if (error) {
        if (error) {
          if (error.message === "User already registered") {
            setSignInError("해당 이메일은 이미 가입한 유저입니다.");
          } else {
            setSignInError(
              "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
            );
          }
          setLoading(false);
          return;
        }
        return;
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <SignUpForm>
        <HomeLogo>instagram</HomeLogo>
        <LoginIcons>
          <Icon src="/images/google_icon.png" />
          <Icon src="/images/kakao_icon.png" />
        </LoginIcons>
        <Line style={{ margin: "30px 0" }}>또는</Line>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errors && (
            <ErrorMessage>{Object.values(errors)[0]?.message}</ErrorMessage>
          )}
          {signInError && <ErrorMessage>{signInError}</ErrorMessage>}

          <SInput
            $top
            type="text"
            placeholder="이메일 주소"
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              minLength: {
                value: 6,
                message: "이메일은 최소 6글자 입니다.",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "이메일 형식으로 작성해주세요",
              },
            })}
            $isError={errors.email ? true : false}
          />
          <SInput
            type="text"
            placeholder="닉네임"
            {...register("nickname", {
              required: "닉네임은 필수 입력입니다.",
            })}
            $isError={errors.nickname ? true : false}
          />
          <SInput
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: "비밀번호는 필수 입력입니다.",
              minLength: { value: 8, message: "비밀번호는 최소 8글자 입니다." },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message: "비밀번호는 대소문자, 숫자, 기호를 꼭 입력해주세요",
              },
            })}
            $isError={errors.password ? true : false}
          />
          <SInput
            $bottom
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            {...register("checkPassword", {
              required: "비밀번호를 한번 더 입력해주세요",
              validate: {
                check: (val) => {
                  if (getValues("password") !== val) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                },
              },
            })}
            $isError={errors.checkPassword ? true : false}
          />
          <Button width="340px" disabled={loading}>
            {loading ? "로딩중 .." : "가입하기"}
          </Button>
        </Form>
        <NoAccount style={{ marginTop: "50px" }}>
          <p>계정이 있으신가요 ?</p>
          <Link to={"/login"}>로그인</Link>
        </NoAccount>
      </SignUpForm>
    </Wrapper>
  );
};

export default SignUp;
