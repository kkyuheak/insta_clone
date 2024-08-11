import styled from "styled-components";
import Button from "../components/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage, SInput } from "./SignUp";
import bcrypt from "bcryptjs";
import supabase from "../supabaseClient";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftSection = styled.div`
  width: 465px;
  height: 580px;
  background-image: url("/images/main_phone_img.png");
  margin-right: 20px;
  position: relative;
`;

const Img = styled(motion.img)`
  position: absolute;
  right: 59px;
  bottom: 15px;
`;

const RightSection = styled.div`
  border: 1px solid #bdbdbd;
  width: 400px;
  height: 550px;
  border-radius: 5px;
`;

export const HomeLogo = styled.p`
  display: block;
  font-size: 90px;
  width: 100%;
  font-family: "Grey Qo", cursive;
  text-align: center;
  margin: 30px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 30px;
  }
`;

export const Line = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  color: rgb(97, 97, 97);
  &::before {
    content: "";
    width: 100px;
    height: 1px;
    background-color: rgb(219, 219, 219);
    display: block;
    margin-right: 10px;
  }

  &::after {
    content: "";
    width: 100px;
    height: 1px;
    background-color: rgb(219, 219, 219);
    display: block;
    margin-left: 10px;
  }
`;

export const LoginIcons = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Icon = styled.img`
  width: 40px;
  cursor: pointer;
`;

export const NoAccount = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;

  a {
    &:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
`;

const ImgVariant: Variants = {
  start: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const imgSrc = [
  "/images/main_phone_img_1.png",
  "/images/main_phone_img_2.png",
  "/images/main_phone_img_3.png",
];

export interface IFormValue {
  Id: string;
  password: number;
  email: string;
  nickname: string;
  checkPassword: number;
}

const Home = () => {
  const [visibleImg, setVisibleImg] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValue>();

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImg((prev) => (prev + 1) % imgSrc.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit: SubmitHandler<IFormValue> = async (inputData) => {
    const hashedPassword = await bcrypt.hash(inputData.password + "", 12);
    console.log(hashedPassword);

    // const { data: user, error } = await supabase
    //   .from("userinfo")
    //   .select("*")
    //   .eq("email", inputData.email)
    //   .single();
    // console.log(user, error);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputData.email,
      password: inputData.password + "",
    });

    console.log(data, error);

    // if (user) {
    //   const match = await bcrypt.compare(inputData.password + "", user.hashPW);
    //   console.log(match);

    //   if(match){
    //     const { data, error } = await supabase.auth.signInWithPassword({
    //       email: inputData.email,
    //       password: 'example-password',
    //     })
    //   }
    // }
  };

  return (
    <Wrapper>
      <LeftSection>
        <AnimatePresence>
          {imgSrc.map(
            (src, idx) =>
              visibleImg === idx && (
                <Img
                  key={src}
                  src={src}
                  variants={ImgVariant}
                  initial="start"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 4 }}
                />
              )
          )}
        </AnimatePresence>
      </LeftSection>
      <RightSection>
        <HomeLogo>instagram</HomeLogo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errors && (
            <ErrorMessage>{Object.values(errors)[0]?.message}</ErrorMessage>
          )}
          <SInput
            type="text"
            placeholder="아이디(이메일)"
            $top
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
            type="password"
            placeholder="비밀번호"
            $bottom
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
          <Button width="330px">로그인</Button>
        </Form>
        <Line>또는</Line>
        <LoginIcons>
          <Icon src="/images/google_icon.png" alt="google_icon" />
          <Icon src="/images/kakao_icon.png" alt="kakao_icon" />
        </LoginIcons>

        <NoAccount>
          <p>계정이 없으신가요 ?</p>
          <Link to={"/signup"}>가입하기</Link>
        </NoAccount>
      </RightSection>
    </Wrapper>
  );
};

export default Home;
