"use client";
import { useEffect } from "react";

import { cn } from "@/lib/utils/cn";

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
};

function Modal({ open, children, size = "lg" }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [open]);

  // 모달 사이즈
  const sizeClass =
    (
      {
        sm: "min-w-[368px] max-w-sm p-6",
        md: "min-w-[568px] max-w-md p-6",
        lg: "min-w-[584px] max-w-lg p-8",
        xl: "min-w-[730px] max-w-xl",
      } as const
    )[size] ?? "min-w-[584px] max-w-lg";

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-black/40">
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white",
          sizeClass,
        )}
      >
        {children}
      </div>
    </div>
  );
}

type ModalHeaderProps = {
  title?: string;
  onClose?: () => void;
};
function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between mb-3">
      <h3 className="text-2xl font-bold">{title}</h3>
      {onClose && <button onClick={onClose}>X</button>}
    </div>
  );
}

type ModalContextProps = {
  children: React.ReactNode;
};

function ModalContext({ children }: ModalContextProps) {
  return <div className="py-3">{children}</div>;
}

type ModalFooterProps = {
  children?: React.ReactNode;
};

function ModalFooter({ children }: ModalFooterProps) {
  return <div className="flex gap-2 pt-3">{children}</div>;
}

export { Modal, ModalHeader, ModalContext, ModalFooter };
