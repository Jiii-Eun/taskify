import Image from "next/image";

import LoginButton from "./LoginButton";

export default function Hero() {
  return (
    <>
      <div>
        <div className="tablet:h-80 pc:h-[422px] tablet:mt-20 tablet:mb-12 relative mt-11 mb-7 h-40 w-full">
          <Image src={"/images/img-main.svg"} alt="메인 이미지" fill />
        </div>
        <div className="tablet:flex-row tablet:gap-7 tablet:mb-28 mb-24 flex flex-col items-center justify-center gap-1.5">
          <div className="pc:text-7xl tablet:text-[56px] text-[40px] leading-none font-bold">
            새로운 일정관리
          </div>
          <div className="font-eng text-brand-blue-500 tablet:text-7xl pc:text-[90px] text-[42px] leading-none font-bold">
            Taskify
          </div>
        </div>
        <LoginButton />
      </div>
    </>
  );
}
