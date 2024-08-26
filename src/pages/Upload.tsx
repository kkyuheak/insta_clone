import { useState } from "react";
import { ChangeHandler, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/Button";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atom";
import supabase from "../supabaseClient";

const Wrapper = styled.form`
  max-width: 1200px;
  margin: 10px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 0px 100px rgb(180, 180, 180);
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

const Text = styled.textarea`
  display: block;
  margin-top: 20px;
  border: 1px solid #cacaca;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  height: 300px;
  outline: none;
  padding: 10px;
  resize: none;
  font-family: "Noto Serif KR", serif;
`;

interface IFormInput {
  images: FileList;
  description: string;
}

const Upload = () => {
  const userInfo = useRecoilValue(UserAtom);
  console.log(userInfo);

  const { register, handleSubmit } = useForm<IFormInput>();
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(JSON.stringify(imgPreviews));
    console.log(data.description);
    console.log(userInfo);
    try {
      const { error } = await supabase.from("Posts").insert({
        image_URL: JSON.stringify(imgPreviews),
        description: data.description,
        nickname: userInfo.nickname,
      });
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
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
        placeholder="문구를 작성하거나 설명을 추가하세요 (최대 400자)"
        maxLength={400}
        {...register("description")}
      ></Text>
      <Button width="120px">등록하기</Button>
    </Wrapper>
  );
};

export default Upload;
