"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import MyButton from "@/components/layout/Button";
import { Dashboard } from "@/features/dashboard/types";
import { cn } from "@/lib/utils/cn";

export default function DashboardList({ dashboards }: { dashboards: Dashboard[] }) {
  const hoverBlueStyle = cn(
    "tablet:hover:bg-brand-blue-50 rounded-[4px] hover:text-brand-blue-500",
    "dark:hover:bg-dark-700 dark:hover:text-brand-blue-100",
  );
  const scrollbarStyle = cn("[&::-webkit-scrollbar]:hidden scrollbar-width:none overflow-y-scroll");

  const router = useRouter();
  const { id } = useParams();
  const currentId = id ? Number(id) : null;

  const handelDashboardClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <>
      <ul
        className={cn(
          scrollbarStyle,
          "tablet:h-full text-brand-gray-500 h-[300px]",
          "dark:text-dark-200",
        )}
      >
        {dashboards.map((d: Dashboard) => {
          const createdByMe = d.createdByMe;
          const activeId = currentId === d.id;

          return (
            <li
              key={d.id}
              className={cn(
                hoverBlueStyle,
                activeId &&
                  cn("tablet:bg-brand-blue-50", "dark:bg-dark-700 dark:text-brand-blue-100"),
                "mb-6 flex justify-center",
                "tablet:justify-start tablet:mb-0 tablet:h-[43px]",
                "pc:h-[50px]",
              )}
            >
              <MyButton
                className={cn(
                  "flex items-center justify-center gap-4 border-0 bg-transparent",
                  "tablet:w-full tablet:px-2.5 tablet:py-2 tablet:justify-start",
                )}
                onClick={() => handelDashboardClick(d.id)}
              >
                <div
                  style={{ backgroundColor: d.color }}
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full",
                    activeId && "tablet:h-2 tablet:w-2 h-3 w-3",
                  )}
                ></div>
                <div className="tablet:flex hidden w-full min-w-0 items-center justify-start gap-[5px]">
                  <div
                    className={cn(
                      "hidden truncate font-medium",
                      "tablet:text-lg tablet:inline-block",
                      "pc:text-2lg",
                    )}
                  >
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
