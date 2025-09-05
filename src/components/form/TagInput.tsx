import { useState } from "react";

import Chip from "@/components/chip/Chip";
import Input from "@/components/form/Input";

export default function TagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 반드시 enter로 값 받음
    if (e.key !== "Enter") return;

    const input = e.currentTarget;
    const value = input.value.trim();
    if (!value) return;

    setTags((prev) => [...prev, value]);
    input.value = "";
  };
  const removeTag = (idx: number) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
  };
  return (
    <div className="relative">
      <Input onKeyDown={addTags} onChange={(e) => setInputValue(e.currentTarget.value)} />
      <div className="absolute top-[11px] left-4 flex flex-wrap gap-2">
        {/* 태그가 없거나 input입력이 시작되지 않았을때만 텍스트 보임 */}
        {tags.length === 0 && inputValue === "" ? (
          <p>태그 입력 후 Enter</p>
        ) : (
          tags.map((tag, i) => (
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
          ))
        )}
      </div>
    </div>
  );
}
