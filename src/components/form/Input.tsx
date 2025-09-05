import React from "react";

import { base, asInput } from "./ControlStyles";

type InputProps = React.ComponentPropsWithRef<"input"> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
};

function Input({ className, leftIcon, rightIcon, ...props }: InputProps) {
  return (
    // 부모 클래스 합쳐서 적용
    <div className={`relative w-full ${className ?? ""}`}>
      {leftIcon && (
        // 좌측에 위치한 아이콘 (달력)
        <span className="absolute top-1/2 left-4 -translate-y-1/2 text-[#9FA6B2]">{leftIcon}</span>
      )}
      <input
        className={[base, asInput, leftIcon ? "pl-[46px]" : "", rightIcon ? "pr-[46px]" : ""].join(
          " ",
        )}
        {...props}
      />
      {/** 우측에 위치한 아이콘 (화살표) */}
      {rightIcon && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-[#9FA6B2]">{rightIcon}</div>
      )}
    </div>
  );
}

export default Input;
