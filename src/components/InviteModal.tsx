"use client";

import { useState } from "react";

import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/components/Modal";
import { inviteToDashboard } from "@/features/dashboard/api";

type InviteModalProps = {
  open: boolean;
  onClose: () => void;
  dashboardId: number;
  onInvited?: () => void;
};

export default function InviteModal({ open, onClose, dashboardId, onInvited }: InviteModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email) {
      alert("이메일을 입력하세요!");
      return;
    }

    try {
      setLoading(true);
      await inviteToDashboard(dashboardId, { email });
      setEmail("");
      onInvited?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("초대에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal open={open} isOpenModal={() => onClose()} size="sm">
      <ModalHeader title="초대하기" onClose={onClose} />
      <ModalContext>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-brand-gray-300 w-full rounded-md border px-3 py-2 text-sm"
        />
      </ModalContext>
      <ModalFooter>
        <button
          className="bg-brand-gray-200 text-brand-gray-700"
          onClick={onClose}
          disabled={loading}
        >
          취소
        </button>
        <button className="bg-brand-blue-500 text-white" onClick={handleInvite} disabled={loading}>
          {loading ? "생성 중..." : "생성"}
        </button>
      </ModalFooter>
    </Modal>
  );
}
