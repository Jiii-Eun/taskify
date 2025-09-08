"use client";
import { useState, useRef } from "react";

type ImgUploadProps = {
  value: string;
  onChange: (file: File | null, url: string) => void;
};

export default function ImgUpload({ value, onChange }: ImgUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const imgFileRef = useRef<HTMLInputElement | null>(null);

  const onClickInput = () => imgFileRef.current?.click();

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const preview = URL.createObjectURL(selected);
    onChange(selected, preview);
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
        {value ? (
          <img
            src={value}
            alt={file?.name ?? "uploaded"}
            className="h-full w-full rounded object-cover"
          />
        ) : (
          <span className="text-brand-blue-500 text-2xl"> +</span>
        )}
      </div>
    </div>
  );
}
