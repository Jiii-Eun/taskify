"use client";

import { usePathname } from "next/navigation";

import MotionLayout from "@/components/layout/MotionLayout";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const isHome = pathname === "/";

  if (isHome) {
    return <MotionLayout>{children}</MotionLayout>;
  }

  if (isDashboard) {
    return (
      <>
        {children}
        <ThemeToggle />
      </>
    );
  }

  return (
    <MotionLayout>
      {children}
      <ThemeToggle />
    </MotionLayout>
  );
}
