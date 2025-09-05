export const base = [
  "w-full rounded-lg border bg-white text-base text-[#333236] outline-none",
  "border-[#D9D9D9] placeholder:text-[#9FA6B2]",
  "aria-[invalid=true]:border-red-500",
  "focus:aria-[invalid=true]:border-red-500",
].join(" ");

export const asInput = "h-[50px] px-4";

export const asPassword = asInput;

export const asTextarea = "min-h-[40px] px-4 pt-[15px]";

// 원래 화살표 숨김
export const asSelect = "h-[50px] px-4 appearance-none";
