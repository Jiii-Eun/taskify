"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import Field from "@/components/form/Field";
import Input from "@/components/form/Input";
import MyButton from "@/components/layout/Button";

type Errors = { email?: string; nickname?: string; password?: string; confirm?: string };
const trueEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const MAX_NICK = 10;
const MIN_PW = 8;

// 우선 mockdata로 로그인 동작 구현, 추후 api 연동 시 보완
const MOCK_TAKEN = new Set(["test@example.com", "taskify@sample.com"]);
async function mockSignupAPI(email: string) {
  await new Promise((r) => setTimeout(r, 350));
  if (MOCK_TAKEN.has(email.trim().toLowerCase())) {
    const e = new Error("EMAIL_TAKEN");
    throw e;
  }
  return { ok: true };
}

export default function SignupPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dupModal, setDupModal] = useState(false);

  const onchange =
    (k: "email" | "nickname" | "password" | "confirm" | "agree") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 이전 상태(s)를 받아서 복사 후 [k] 자리에 덮어씀
      setValues((s) => ({ ...s, [k]: e.target.value }));
      setErrors((s) => ({ ...s, [k]: undefined }));
      if (k !== "agree") setErrors((s) => ({ ...s, [k]: undefined }));
    };

  // 블러 시 이메일 검사
  const onBlurEmail = () => {
    // 기존 에러 객체 s 복사 후 email 필드만 새로운 값으로 갱신
    setErrors((s) => ({
      ...s,
      email:
        !values.email || trueEmail(values.email) ? undefined : "이메일 형식으로 작성해 주세요.",
    }));
  };

  // 블러 시 닉네임 검사
  const onBlurNickname = () => {
    setErrors((s) => ({
      ...s,
      nickname:
        !values.nickname || values.nickname.length <= MAX_NICK
          ? undefined
          : "열 자 이하로 작성해주세요.",
    }));
  };

  // 블러 시 비밀번호 검사
  const onBlurPw = () => {
    setErrors((s) => ({
      ...s,
      password:
        !values.password || values.password.length >= MIN_PW
          ? undefined
          : "8자 이상 작성해 주세요.",
    }));
  };

  // 비밀번호 일치 확인 여부
  const onBlurConfirm = () => {
    setErrors((s) => ({
      ...s,
      confirm:
        !values.confirm || values.confirm === values.password
          ? undefined
          : "비밀번호가 일치하지 않습니다.",
    }));
  };

  // 가입하기 버튼 활성화 조건
  const activeButton = useMemo(() => {
    const okEmail = trueEmail(values.email);
    const okNickname = values.nickname.length > 0 && values.nickname.length <= MAX_NICK;
    const okPw = values.password.length >= MIN_PW;
    const okConfirm = values.confirm === values.password;
    return okEmail && okNickname && okPw && okConfirm;
  }, [values]);

  const canSubmit = activeButton && values.agree && !submitting;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onBlurEmail();
    onBlurNickname();
    onBlurPw();
    onBlurConfirm();
    if (!activeButton || !values.agree) return;

    try {
      setSubmitting(true);
      await mockSignupAPI(values.email);
      alert("가입이 완료되었습니다");
      router.push("/login");
    } catch (err) {
      if (err instanceof Error && err.message === "EMAIL_TAKEN") {
        setDupModal(true);
      } else {
        alert("회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.");
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
      <p className="mb-[30px] text-center text-xl text-[#333236]">첫 방문을 환영합니다!</p>

      <form ref={formRef} onSubmit={onSubmit} className="w-full space-y-8">
        <Field id="email" label="이메일" error={errors.email}>
          <Input
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={values.email}
            onChange={onchange("email")}
            onBlur={onBlurEmail}
          />
        </Field>
        <Field id="nickname" label="닉네임" error={errors.nickname}>
          <Input
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={values.nickname}
            onChange={onchange("nickname")}
            onBlur={onBlurNickname}
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
              onBlur={onBlurPw}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
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
              }
            />
          </div>
        </Field>
        <Field id="confirm" label="비밀번호 확인" error={errors.confirm}>
          <div className="relative">
            <Input
              aria-invalid={!!errors.password}
              aria-errormessage="password-error"
              type={showPw ? "text" : "password"}
              placeholder="비밀번호를 한번 더 입력해 주세요"
              value={values.confirm}
              onChange={onchange("confirm")}
              onBlur={onBlurConfirm}
              rightIcon={
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
              }
            />
          </div>
        </Field>

        <label className="flex items-center gap-2 text-[16px] text-[#333236]">
          <input
            type="checkbox"
            checked={values.agree}
            onChange={onchange("agree")}
            className="h-4 w-4 accent-blue-600"
          />
          이용약관에 동의합니다.
        </label>

        <MyButton
          onClick={() => {
            if (!canSubmit) return;
            formRef.current?.requestSubmit();
          }}
          color={canSubmit ? "buttonGrey" : "buttonBlue"}
          className={`h-[50px] w-full ${canSubmit ? "pointer-events-none" : ""} text-white`}
        >
          {submitting ? "가입 중" : "가입하기"}
        </MyButton>
      </form>
      <div className="mt-[24px] text-center text-[16px] text-[#333236]">
        이미 회원이신가요?
        <Link
          href="/login"
          className="ml-1 text-[#2661E8] underline decoration-1 underline-offset-2"
        >
          로그인하기
        </Link>
      </div>

      {dupModal}
    </main>
  );
}
