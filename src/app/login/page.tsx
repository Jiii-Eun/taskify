"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import Field from "@/components/form/Field";
import Input from "@/components/form/Input";
import MyButton from "@/components/layout/Button";

type Errors = { email?: string; password?: string };
const trueEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// 우선 mockdata로 로그인 동작 구현, 추후 api 연동 시 보완
const MOCK_DELAY = 400;

async function mockLogin(email: string, password: string) {
  await new Promise((r) => setTimeout(r, MOCK_DELAY));

  if (password !== "test1234") {
    const err = new Error("INVALID_PW");
    throw err;
  }

  const payload = { sub: email, iat: Date.now() };
  const accessToken = `mock.${btoa(JSON.stringify(payload))}`;
  return { accessToken };
}

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onchange = (k: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이전 상태(s)를 받아서 복사 후 [k] 자리에 덮어씀
    setValues((s) => ({ ...s, [k]: e.target.value }));
    setErrors((s) => ({ ...s, [k]: undefined }));
  };

  // 블러 시 이메일 검사
  const validateEmailOnBlur = () => {
    // 기존 에러 객체 s 복사 후 email 필드만 새로운 값으로 갱신
    setErrors((s) => ({
      ...s,
      email:
        !values.email || trueEmail(values.email) ? undefined : "이메일 형식으로 작성해 주세요.",
    }));
  };

  // 블러 시 비밀번호 검사
  const validatePwOnBlur = () => {
    setErrors((s) => ({
      ...s,
      password:
        !values.password || values.password.length >= 8 ? undefined : "8자 이상 작성해 주세요.",
    }));
  };

  const canSubmit = trueEmail(values.email) && values.password.length >= 8;
  const disabledSubmit = !canSubmit || submitting;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateEmailOnBlur();
    validatePwOnBlur();
    if (!canSubmit) return;

    try {
      setSubmitting(true);

      const { accessToken } = await mockLogin(values.email, values.password);

      localStorage.setItem("access_token", accessToken);

      router.push("/mydashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      if (message === "INVALID_PW") {
        window.alert("비밀번호가 일치하지 않습니다.");
      } else {
        window.alert("로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col items-center justify-center">
      <Link
        href="/"
        className="mb-[12px] flex flex-col items-center gap-[5px]"
        aria-label="홈으로 이동"
      >
        <Image src="/images/img-logo-large.svg" alt="Taskify 텍스트 로고" width={300} height={60} />
      </Link>
      <p className="mb-[30px] text-center text-xl text-[#333236]">오늘도 만나서 반가워요!</p>

      <form ref={formRef} onSubmit={onSubmit} className="w-full space-y-8">
        <Field id="email" label="이메일" error={errors.email}>
          <Input
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={values.email}
            onChange={onchange("email")}
            onBlur={validateEmailOnBlur}
          />
        </Field>
        <Field id="password" label="비밀번호" error={errors.password}>
          <div className="relative">
            <Input
              aria-invalid={!!errors.password}
              aria-errormessage="password-error"
              type={showPw ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요"
              value={values.password}
              onChange={onchange("password")}
              onBlur={validatePwOnBlur}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              aria-pressesd={showPw}
              aria-controls="password"
              aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
              className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-gray-500"
            >
              <Image
                src={showPw ? "/icons/icon-eye-close.svg" : "/icons/icon-eye-open.svg"}
                alt="눈 아이콘"
                width={24}
                height={24}
              />
            </button>
          </div>
        </Field>

        <MyButton
          onClick={() => {
            if (disabledSubmit) return;
            formRef.current?.requestSubmit();
          }}
          color={disabledSubmit ? "buttonGrey" : "buttonBlue"}
          className={`h-[50px] w-full ${disabledSubmit ? "pointer-events-none" : ""} text-white`}
        >
          {submitting ? "로그인 중" : "로그인"}
        </MyButton>
      </form>
      <div className="mt-[24px] text-center text-[16px] text-[#333236]">
        회원이 아니신가요?
        <Link
          href="/signup"
          className="ml-1 text-[#2661E8] underline decoration-1 underline-offset-2"
        >
          회원가입하기
        </Link>
      </div>
    </main>
  );
}
