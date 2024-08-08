import styled from "styled-components";
import {
  Form,
  HomeLogo,
  Icon,
  IFormValue,
  Line,
  LoginIcons,
  NoAccount,
} from "./Home";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import supabase from "../supabaseClient";
import bcrypt from "bcryptjs";

const Wrapper = styled.div``;

const SignUpForm = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  padding: 30px 0;
  width: 400px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
`;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValue>();

  const onSubmit: SubmitHandler<IFormValue> = async (inputData) => {
    console.log(inputData.password);

    const hashedPassword = await bcrypt.hash(inputData.password + "", 12);
    console.log(hashedPassword);

    const { data, error } = await supabase.auth.signUp({
      email: inputData.email,
      password: hashedPassword,
    });

    console.log(data, error);

    const userData = await supabase.from("userinfo").insert({
      id: data.user?.id,
      nickname: inputData.nickname,
      email: data.user?.email,
      hashPW: hashedPassword,
    });

    console.log("userData :", userData);
  };

  console.log(Object.keys(errors)[0]);
  console.log(errors);

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
          {errors.email && <p>{errors.email.type}</p>}
          <Input
            type="e-mail"
            placeholder="이메일 주소"
            top
            register={register}
            required
            label="email"
            pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
          />
          <Input
            type="text"
            placeholder="닉네임"
            middle
            register={register}
            required
            label="nickname"
          />
          <Input
            type="password"
            placeholder="비밀번호"
            register={register}
            required
            label="password"
            min={8}
            pattern={
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
            }
          />
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            bottom
            register={register}
            required
            label="checkPassword"
          />
          <Button width="340px">가입하기</Button>
        </Form>
        <NoAccount style={{ marginTop: "50px" }}>
          <p>계정이 있으신가요 ?</p>
          <Link to={"/"}>로그인</Link>
        </NoAccount>
      </SignUpForm>
    </Wrapper>
  );
};

export default SignUp;
