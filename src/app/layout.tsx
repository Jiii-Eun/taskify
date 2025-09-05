import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

const pretendard = localFont({
  src: [
    { path: "../assets/fonts/Pretendard-Regular.woff2", weight: "400" },
    { path: "../assets/fonts/Pretendard-Medium.woff2", weight: "500" },
    { path: "../assets/fonts/Pretendard-SemiBold.woff2", weight: "600" },
    { path: "../assets/fonts/Pretendard-Bold.woff2", weight: "700" },
    { path: "../assets/fonts/Pretendard-Black.woff2", weight: "900" },
  ],
  variable: "--font-sans",
});

const montserrat = localFont({
  src: [
    { path: "../assets/fonts/Montserrat-SemiBold.ttf", weight: "600" },
    { path: "../assets/fonts/Montserrat-Bold.ttf", weight: "700" },
  ],
  variable: "--font-eng",
});

export const metadata: Metadata = {
  title: "Taskify",
  description: "Task management app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
