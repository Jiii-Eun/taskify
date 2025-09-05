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

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          scrollbarStyle,
          "tablet:w-40 pc:w-[18.75rem] border-brand-gray-300 tablet:px-3.5 tablet:pt-5 w-16 flex-shrink-0 border-r bg-white py-5",
        )}
      >
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="border-brand-gray-300 tablet:px-10 tablet:py-4 tablet:h-[4.375rem] h-[3.75rem] border-b px-3 py-3.5 align-middle">
          <Navbar id={dashboardId ?? undefined} />
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
