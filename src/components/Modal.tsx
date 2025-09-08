"use client";
import Image from "next/image";
import { useEffect } from "react";

import { cn } from "@/lib/utils/cn";

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  isOpenModal?: (open: boolean) => void;
  className?: string;
};

function Modal({ open, children, size = "lg", isOpenModal, className }: ModalProps) {
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
        xl: "min-w-[730px] max-w-xl pt-[30px] pr-[38px] pb-[30px] pl-4",
      } as const
    )[size] ?? "min-w-[584px] max-w-lg";

  return (
    <div
      className="fixed top-0 left-0 z-50 h-screen w-screen overflow-hidden bg-black/40"
      onClick={() => isOpenModal?.(false)}
    >
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white",
          sizeClass,
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

type ModalHeaderProps = {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
};
function ModalHeader({ title, children, onClose }: ModalHeaderProps) {
  return (
    <div className="mb-3 flex justify-between">
      <h3 className="text-2xl font-bold">{title}</h3>
      {children}
      {onClose && (
        <button onClick={onClose}>
          <Image src="/icons/icon-close-big.svg" alt="close" width={36} height={36} />
        </button>
      )}
    </div>
  );
}

type ModalContextProps = {
  children: React.ReactNode;
  className?: string;
};

function ModalContext({ children, className }: ModalContextProps) {
  return <div className={cn("py-3", className)}>{children}</div>;
}

type ModalFooterProps = {
  children?: React.ReactNode;
};

function ModalFooter({ children }: ModalFooterProps) {
  return <div className="flex gap-2 pt-3">{children}</div>;
}

export { Modal, ModalHeader, ModalContext, ModalFooter };
