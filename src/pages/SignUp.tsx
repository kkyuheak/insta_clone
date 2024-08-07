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
  const { register, handleSubmit } = useForm<IFormValue>();

  const onSubmit: SubmitHandler<IFormValue> = async (inputData) => {
    console.log(inputData.password);

    const { data, error } = await supabase.auth.signUp({
      email: inputData.email,
      password: inputData.password + "",
    });

    console.log(data, error);

    const userData = await supabase.from("userinfo").insert({
      id: "asd",
      nickname: inputData.nickname,
      email: data.user?.email,
      hasdPW: inputData.password,
    });

    console.log("userData :", userData);
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
          <Input
            type="e-mail"
            placeholder="이메일 주소"
            top
            register={register}
            required
            label="email"
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
          />
          {/* <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            bottom
            register={register}
            required
            label="checkPassword"
          /> */}
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
