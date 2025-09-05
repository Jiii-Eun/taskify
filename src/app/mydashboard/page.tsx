"use client"; 

import MyButton from "@/components/layout/Button";

export default function MyDashboard() {
  return (
    <div>
      <MyButton text="새로운 대시보드" className="py-2.5 px-5 me-2 mb-2 text-[#787486] w-[160px] h-[60px]" onClick={() => alert("대시보드 생성!")}/>
      <MyButton text="로그인" className="py-2.5 px-5 me-2 mb-2 text-[#FFF]" color="buttonBlue" onClick={() => alert("대시보드 생성!")}/>
      <MyButton text="로그인" className="py-2.5 px-5 me-2 mb-2 text-[#FFF]" color="buttonGrey" onClick={() => alert("대시보드 생성!")}/>
    </div>
  );
}