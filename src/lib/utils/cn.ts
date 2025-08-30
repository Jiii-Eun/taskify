import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

// 컴포넌트에서 사용시 예시
// import { cn } from "@/lib/utils";

// export function Button({ primary }: { primary?: boolean }) {
//   return (
//     <button
//       className={cn(
//         "px-4 py-2 rounded-sm transition",
//         primary ? "bg-blue-500 text-white" : "bg-gray-200 text-black",
//         "hover:opacity-80"
//       )}
//     >
//       버튼
//     </button>
//   );
// }
