import { useState } from "react";
import { ChangeHandler, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/Button";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";
import supabase from "../supabaseClient";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.form`
  max-width: 1200px;
  margin: 10px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 0px 100px rgb(180, 180, 180);
`;

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingCircle = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 8px solid #fff;
  border-top: 8px solid #595959;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: 600;
  font-family: "Noto Serif KR", serif;
`;
const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  color: #fff;
  background-color: rgb(14, 127, 244);
  border-radius: 10px;
  margin: 10px 0;

  cursor: pointer;

  &:hover {
    background-color: rgba(14, 127, 244, 0.8);
  }
`;

const Input = styled.input`
  display: none;
`;

const PrevImages = styled.div`
  width: 100%;
  height: 560px;
  display: flex;
  align-items: center;
  gap: 15px;
  overflow-x: scroll;
  border: 1px solid #b7b7b7;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PrevImg = styled.div<{ $src: string }>`
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #fff;
  border-radius: 10px;
  width: 400px;
  height: 550px;
  flex-shrink: 0;
  box-shadow: 1px 0px 10px rgb(180, 180, 180);
`;

const Text = styled.textarea<{ $error: boolean }>`
  display: block;
  margin-top: 20px;
  border: ${(props) =>
    props.$error ? "2px solid #db0000" : "1px solid #cacaca"};
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  height: 300px;
  outline: none;
  padding: 10px;
  resize: none;
  font-family: "Noto Serif KR", serif;

  &::placeholder {
    color: ${(props) => (props.$error ? "#db0000" : "")};
  }
`;

interface IFormInput {
  images: FileList;
  description: string;
}

// loading animation
const loadingVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
    transition: { ease: "linear", duration: 1, repeat: Infinity },
  },
};

const Upload = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(UserAtom);

  const {
    register,
    handleSubmit,
    formState: { errors: textError },
  } = useForm<IFormInput>();
  // textError 핸들링
  const desError = textError.description?.message;

  // img 경로 저장
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data.images);
    console.log(data.description);
    console.log(userInfo);
    try {
      setIsLoading(true);

      // img supabase stoarge에 업로드
      const imgFiles = Array.from(data.images);
      console.log("imgFiles : ", imgFiles);

      const imageUrls = [];
      for (const file of imgFiles) {
        const { data, error } = await supabase.storage
          .from("posts_images")
          .upload(`uploads/${file.name}`, file);

        console.log(data);

        if (error) {
          console.error(error);
          continue;
        }

        const publicUrl = supabase.storage
          .from("posts_images")
          .getPublicUrl(`uploads/${file.name}`).data.publicUrl;

        console.log(publicUrl);
        imageUrls.push(publicUrl);
      }

      // post 정보 데이터베이스에 저장
      const { error } = await supabase.from("Posts").insert({
        image_URL: JSON.stringify(imageUrls),
        description: data.description,
        nickname: userInfo.nickname,
      });
      navigate("/");

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange: ChangeHandler = (e) => {
    console.log(e.target.files);
    const files: FileList = e.target.files;
    if (files) {
      const imagePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImgPreviews(imagePreviews);
    }
    return e.target.files;
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <Loading>
          <LoadingCircle
            variants={loadingVariants}
            initial="initial"
            animate="animate"
          />
        </Loading>
      ) : null}
      <Title>새 게시물 만들기</Title>
      <Label htmlFor="img">사진 추가</Label>
      <Input
        id="img"
        type="file"
        accept=".png, .jpeg, .jpg"
        {...register("images", { onChange: handleChange })}
        multiple
      />
      <PrevImages>
        {imgPreviews.map((preview, i) => {
          return <PrevImg $src={preview} key={i} />;
        })}
      </PrevImages>
      <Text
        placeholder={
          desError
            ? desError
            : "문구를 작성하거나 설명을 추가하세요 (최대 400자)"
        }
        maxLength={400}
        {...register("description", {
          required: "필수로 입력해야 합니다!",
        })}
        $error={desError ? true : false}
      ></Text>
      <Button width="120px">등록하기</Button>
    </Wrapper>
  );
};

export default Upload;
