"use client";

import Link from "next/link";

import MyButton from "../layout/Button";

export default function LoginButton() {
  return (
    <Link href="/login" className="tablet:mb-[180px] mb-[76px] flex justify-center">
      <MyButton
        onClick={() => {}}
        color="buttonBlue"
        className="tablet:w-[280px] tablet:!text-2lg tablet:h-[54px] h-[46px] w-56 font-normal"
      >
        로그인하기
      </MyButton>
    </Link>
  );
}
