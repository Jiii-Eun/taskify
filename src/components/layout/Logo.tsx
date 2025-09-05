"use client";

import Image from "next/image";
import Link from "next/link";

import { useIsLoggedIn } from "@/features/auth/store";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  isHome?: boolean;
};

export default function Logo({ isHome = false }: LogoProps) {
  const isLoggedIn = useIsLoggedIn();
  const href = isLoggedIn ? "/mydashboard" : "/";

  const logoConfig = isHome
    ? {
        src: "/images/img-logo-large-white.svg",
        smallsrc: "/images/img-logo-small-white.svg",
        wrapperClass: "tablet:w-[121px]",
      }
    : {
        src: "/images/img-logo-large.svg",
        smallsrc: "/images/img-logo-small.svg",
        wrapperClass: "tablet:w-[110px]",
      };

  return (
    <>
      {/* Image를 디바이스로 관리해서 src를 변경되게 하는게 나은가 아님 이렇게 따로 관리하는게 나은가 */}
      <h1 className={cn("tablet:h-[46px] h-[30px] w-[30px]", logoConfig.wrapperClass)}>
        <Link href={href}>
          <div className="relative h-full w-full">
            <Image
              src={logoConfig.src}
              alt="로고"
              fill
              priority
              className="tablet:block hidden object-contain"
            />
            <Image
              src={logoConfig.smallsrc}
              alt="로고"
              fill
              className="tablet:hidden object-contain"
            />
          </div>
        </Link>
      </h1>
    </>
  );
}
