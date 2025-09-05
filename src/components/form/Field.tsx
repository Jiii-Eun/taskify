import React from "react";

type A11yProps = { id?: string } & React.AriaAttributes;

export type FieldProps<P extends A11yProps = A11yProps> = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactElement<P>;
};

export default function Field<P extends A11yProps>({
  id,
  label,
  error,
  className,
  children, // <Input/>, <Select/>, <Textarea/> 등 1개
}: FieldProps<P>) {
  // 에러id
  const idError = error ? `${id}-error` : undefined;
  const injected: A11yProps = {
    id,
    // 에러가 있으면 유효하지 않음 상태로 스크린리더기에 표시
    "aria-invalid": !!error,
    ...(idError ? { "aria-errormessage": idError } : {}),
  };
  // children 복제, props 추가 후 새로운 리액트 엘리먼트 생성, id 이미 있으면 덮어씀
  const access = React.cloneElement(children, injected as P);

  return (
    <div className={["w-full space-y-2", className].filter(Boolean).join(" ")}>
      <label htmlFor={id} className="block text-[18px] font-medium text-gray-800">
        {label}
      </label>
      {access}
      {error && (
        <p id={idError} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
