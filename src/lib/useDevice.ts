"use client";

import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "pc";

export function useDevice(): DeviceType {
  const [device, setDevice] = useState<DeviceType>("mobile");

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;

      if (width >= 1248) {
        setDevice("pc");
      } else if (width >= 744) {
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
