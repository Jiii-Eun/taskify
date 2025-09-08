"use client";

import ExtraFeatures from "@/components/home/ExtraFeatures";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/home/Footer";
import Header from "@/components/layout/home/Header";
import TestLogin from "@/components/layout/home/TestLogin";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center bg-black text-white">
      <Header />
      <main className="flex flex-1 justify-center">
        <TestLogin />
        <div className="pc:w-[1200px] tablet:w-[664px] w-[343px]">
          <Hero />
          <Features />
          <ExtraFeatures />
        </div>
      </main>
      <Footer />
    </div>
  );
}
