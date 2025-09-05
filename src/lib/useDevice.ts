"use client";

import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "pc";

export function useDevice(): DeviceType {
  const [device, setDevice] = useState<DeviceType>("mobile");

  useEffect(() => {
    const checkSize = () => {
      // rem계산으로 변경
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const widthRem = window.innerWidth / rem;

      if (widthRem >= 78) {
        setDevice("pc");
      } else if (widthRem >= 46.5) {
        setDevice("tablet");
      } else {
        setDevice("mobile");
      }
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return device;
}
