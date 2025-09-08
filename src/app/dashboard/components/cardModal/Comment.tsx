"use client";

import { useState } from "react";

import Field from "@/components/form/Field";
import Textarea from "@/components/form/Textarea";
import Button from "@/components/layout/Button";
import { createComment, updateComment, deleteComment } from "@/features/comments/api";

export default function Comment() {
  const [input, setInput] = useState("");
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState<number | null>(null);

  const cardId = 14055;
  const columnId = 54736;
  const dashboardId = 16211;

  const handleCreate = async () => {
    try {
      const res = await createComment({
        content: input.trim(),
        cardId,
        columnId,
        dashboardId,
      });
      const newComment = res;
      setComment(newComment.content);
      setCommentId(newComment.id);
    } catch (e) {
      alert((e as Error).message || "댓글 생성 실패");
    }
  };

  const handleModify = async () => {
    if (!commentId) return alert("댓글 ID가 없습니다");
    try {
      const res = await updateComment(commentId, { content: input.trim() });
      const updated = res;
      setComment(updated.content);
    } catch (e) {
      alert((e as Error).message || "댓글 수정 실패");
    }
  };

  const handleDelete = async () => {
    if (!commentId) return alert("컬럼 아이디 확인 실패");
    try {
      await deleteComment(commentId);
      setComment("");
      setCommentId(null);
    } catch (e) {
      alert((e as Error).message || "댓글 삭제 실패");
    }
  };

  return (
    <>
      <Field id="comment" label="댓글">
        <div className="rounded-lg border border-[#D9D9D9] p-3">
          <Textarea
            placeholder="댓글 작성하기"
            className="resize-none rounded-none border-0 !p-0"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <div className="mt-1 flex justify-end">
            <Button
              color="buttonBasic"
              onClick={handleCreate}
              className="text-brand-blue-500 h-8 w-20"
            >
              입력
            </Button>
          </div>
        </div>
      </Field>
      {comment && (
        <div className="flex gap-2.5">
          <div className="bg-brand-orange flex h-[34px] w-[34px] items-center justify-center rounded-full font-bold text-white">
            C
          </div>
          <div className="text-sm">
            <div className="flex items-end gap-2">
              <p className="font-bold">정만철</p>
              <span className="text-brand-gray-400 text-xs">댓글생성 날짜</span>
            </div>
            <p>{comment}</p>
            <div className="text-brand-gray-400 flex justify-start gap-3.5 underline underline-offset-2">
              <button onClick={handleModify}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
