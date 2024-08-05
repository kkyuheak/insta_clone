import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const HomeLogo = styled.p`
  display: block;
  font-size: 90px;
  width: 100%;
  /* height: 40px; */
  font-family: "Grey Qo", cursive;
  text-align: center;
  margin: 30px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 30px;
  }
`;

const Line = styled.p`
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

const LoginIcons = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Icon = styled.img`
  width: 40px;
  cursor: pointer;
`;

const NoAccount = styled.div`
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

const Home = () => {
  const [visibleImg, setVisibleImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImg((prev) => (prev + 1) % imgSrc.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

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
        <Form>
          <Input type="text" placeholder="아이디(이메일)" top />
          <Input type="password" placeholder="비밀번호" bottom />
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
