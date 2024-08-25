import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.form``;

interface IFormInput {
  images: FileList;
}

const Upload = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imagePreviews = Array.from(files).map((file) => {
        return URL.createObjectURL(file);
      });
      setImgPreviews(imagePreviews);
    }
  };

  // useEffect(() => {
  //   if(imagesFiles && imagesFiles.length > 0){
  //     const previews: string[] = [];
  //     for(let i = 0; i < imagesFiles.length; i++){
  //       const reader = new FileReader();
  //       reader.onloadend  = () => {
  //         previews.push(reader.result + "");
  //         if(previews.length === imgPreviews.length){
  //           setImgPreviews(previews)
  //         }
  //       }
  //       reader.readAsDataURL(imagesFiles[i])
  //     }
  //   }
  // }, [imagesFiles])

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <h1>새 게시물 만들기</h1>
      <input
        type="file"
        accept=".png, .jpeg, .jpg"
        {...register("images")}
        onChange={handleChange}
        multiple
      />
      <div>
        {imgPreviews.map((preview, i) => {
          return <img src={preview} key={i} />;
        })}
      </div>
      <button>등록하기</button>
    </Wrapper>
  );
};

export default Upload;
