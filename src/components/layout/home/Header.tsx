import Link from "next/link";

import Logo from "../Logo";

export default function Header() {
  return (
    <header className="pc:px-20 tablet:px-10 border-b border-b-[rgba(23,23,23,0.6)] px-6 py-4">
      <div className="flex justify-between">
        <Logo isHome={true} />
        <div className="tablet:text-lg flex items-center gap-[36px] text-sm font-normal">
          <Link href={"/login"}>로그인</Link>
          <Link href={"/signup"}>회원가입</Link>
        </div>
      </div>
    </header>
  );
}
