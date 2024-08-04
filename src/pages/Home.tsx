import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

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
  border: 1px solid blue;
  position: relative;
`;

const Img = styled(motion.img)`
  position: absolute;
  right: 59px;
  bottom: 15px;
`;

const Form = styled.form`
  border: 1px solid red;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
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
    }, 7000);

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
      <Form>
        <Input type="text" placeholder="아이디(이메일)" top />
        <Input type="password" placeholder="비밀번호" bottom />
        <Button></Button>
      </Form>
    </Wrapper>
  );
};

export default Home;
