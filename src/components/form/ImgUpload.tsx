"use client";
import { useState, useRef } from "react";

export default function ImgUpload() {
  const [file, setFile] = useState<File | null>(null);
  const imgFileRef = useRef<HTMLInputElement | null>(null);

  const onClickInput = () => {
    imgFileRef.current?.click();
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      {/* 원래 인풋 안보이게 처리 */}
      <input
        ref={imgFileRef}
        type="file"
        accept="image/*"
        onChange={onChangeFile}
        className="hidden"
      />

      {/* 실제 보이는 이미지 업로드 */}
      <div
        onClick={onClickInput}
        className="bg-brand-gray-200 flex h-[76px] w-[76px] items-center justify-center rounded border-0"
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="h-full w-full rounded object-cover"
          />
        ) : (
          <span className="text-brand-blue-500 text-2xl"> +</span>
        )}
      </div>
    </div>
  );
}
