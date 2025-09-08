"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import UserMenu from "@/components/layout/dashboard/Navbar/UserMenu";
import { getMe } from "@/features/users/api";
import { useApiHandler } from "@/lib/useApiHandler";
import { useOutsideClick } from "@/lib/useOutsideClick";
import { cn } from "@/lib/utils/cn";

export default function User() {
  const { data } = useApiHandler(() => getMe(), []);

  const [isMenu, setIsMenu] = useState(false);

  const menuRef = useOutsideClick(() => setIsMenu(false));

  const userProfile = data?.profileImageUrl;
  const userName = data?.nickname;

  const toggleMenu = () => {
    setIsMenu((prev) => !prev);
  };

  return (
    <div ref={menuRef} className="tablet:ml-6 pc:ml-8 relative ml-3">
      <button className="flex flex-row items-center" onClick={toggleMenu}>
        <img
          src={userProfile}
          alt="유저 프로필 이미지"
          className="tablet:w-[38px] tablet:h-[38px] h-[34px] w-[34px] rounded-full object-cover"
        />

        <div className="tablet:flex ml-3 hidden">{userName}</div>
      </button>

      <AnimatePresence>
        {isMenu && (
          <motion.div
            key="dropdown"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "tablet:right-[-28px] absolute top-11 right-0 w-[128px] overflow-hidden rounded-[6px] border bg-white p-1.5 shadow-md",
              "dark:bg-dark-800 dark:border-dark-600",
            )}
          >
            <UserMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
