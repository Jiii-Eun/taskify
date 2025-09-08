"use client";

import { useParams } from "next/navigation";
import { ReactNode } from "react";

import Navbar from "@/components/layout/dashboard/Navbar";
import Sidebar from "@/components/layout/dashboard/Sidebar";
import { cn } from "@/lib/utils/cn";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { id } = useParams();
  const dashboardId = id ? Number(id) : null;

  const scrollbarStyle = cn("[&::-webkit-scrollbar]:hidden scrollbar-width:none overflow-y-scroll");
  const darkStyle = cn("dark:bg-dark-800 dark:border-dark-700 dark:text-dark-200");

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          scrollbarStyle,
          "tablet:w-40 pc:w-[300px] border-brand-gray-300 tablet:px-3.5 tablet:pt-5 w-16 flex-shrink-0 border-r bg-white py-5",
          darkStyle,
        )}
      >
        <Sidebar />
      </aside>

      <div className={cn("flex min-w-0 flex-1 flex-col")}>
        <div
          className={cn(
            "border-brand-gray-300 tablet:px-10 tablet:py-4 tablet:h-[70px] h-[60px] border-b px-3 py-3.5 align-middle",
            darkStyle,
          )}
        >
          <Navbar id={dashboardId ?? undefined} />
        </div>

        <main className="w-full overflow-x-auto">
          <div className="flex-1 gap-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
