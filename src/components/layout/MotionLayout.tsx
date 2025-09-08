"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export default function MotionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: "easeIn" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
