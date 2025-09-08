"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setIsDark(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-brand-blue-500 hover:bg-brand-blue-600 tablet:right-6 tablet:bottom-6 tablet:h-12 tablet:w-12 dark:bg-dark-800 fixed right-3 bottom-3 z-50 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg transition-colors"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
