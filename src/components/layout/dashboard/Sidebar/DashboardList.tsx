"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import MyButton from "@/components/layout/Button";
import { Dashboard } from "@/features/dashboard/types";
import { cn } from "@/lib/utils/cn";

export default function DashboardList({ dashboards }: { dashboards: Dashboard[] }) {
  const hoverBlueStyle = cn("tablet:hover:bg-brand-blue-50 rounded-[4px]");
  const scrollbarStyle = cn("[&::-webkit-scrollbar]:hidden scrollbar-width:none overflow-y-scroll");

  const router = useRouter();

  const handelDashboardClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <>
      <ul className={cn(scrollbarStyle, "tablet:h-full text-brand-gray-500 h-[300px]")}>
        {dashboards.map((d: Dashboard) => {
          const createdByMe = d.createdByMe;
          return (
            <li
              key={d.id}
              className={cn(
                hoverBlueStyle,
                "tablet:justify-start tablet:mb-0 mb-6 flex h-[50px] justify-center",
              )}
            >
              <MyButton
                className="tablet:w-full tablet:px-2.5 tablet:py-2 tablet:justify-start flex items-center justify-center gap-4 border-0 bg-transparent"
                onClick={() => handelDashboardClick(d.id)}
              >
                <div
                  style={{ backgroundColor: d.color }}
                  className="h-2 w-2 shrink-0 rounded-full"
                ></div>
                <div className="tablet:flex hidden w-full min-w-0 items-center justify-start gap-[5px]">
                  <div className="pc:text-2lg tablet:text-lg tablet:inline-block hidden truncate font-medium">
                    {d.title}
                  </div>
                  {createdByMe && (
                    <Image
                      src={"/icons/icon-crown.svg"}
                      alt="내가만든 대시보드"
                      width={18}
                      height={14}
                    />
                  )}
                </div>
              </MyButton>
            </li>
          );
        })}
      </ul>
    </>
  );
}
