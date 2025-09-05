"use client";
import { useState } from "react";

import { Modal, ModalHeader, ModalFooter } from "@/components/Modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="py-12 text-3xl font-bold text-center">components 페이지</h1>
      <div className="px-12">
        <div>
          <h3 className="text-xl">Modal component</h3>
          <button
            className="px-4 py-2 mt-4 text-white rounded bg-violet-500 hover:bg-violet-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            모달 열기
          </button>
          {isOpen && (
            <Modal open={isOpen}>
              <ModalHeader title="모달제목" onClose={() => setIsOpen(false)} />
              모달 내용
              <ModalFooter>
                <button>확인</button>
              </ModalFooter>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
