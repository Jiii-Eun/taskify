import { useState } from "react";

import Chip from "@/components/chip/Chip";
import Input from "@/components/form/Input";

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export default function TagInput({ value, onChange }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 반드시 enter로 값 받음
    if (e.key !== "Enter") return;

    const input = e.currentTarget;
    const newTag = input.value.trim();
    if (!newTag) return;

    onChange([...value, newTag]);
    setInputValue("");
    input.value = "";
  };
  const removeTag = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };
  return (
    <div className="relative">
      <Input
        onKeyDown={addTags}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        placeholder="태그 입력 후 Enter"
      />
      <div className="bg-brand-gray-100 absolute top-[50px] left-0 flex w-full flex-wrap gap-2 rounded-lg px-4 py-2">
        {/* 태그가 없거나 input입력이 시작되지 않았을때만 텍스트 보임 */}
        {value.map((tag, i) => (
          <div key={i}>
            <Chip variant="category" label={tag} />
            <button
              onClick={() => {
                removeTag(i);
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
