"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Chip from "@/components/common/chip/Chip";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import InviteModal from "@/components/modal/InviteModal";
import MyButton from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";
import {
  getDashboardById,
  updateDashboard,
  deleteDashboard,
  getDashboardInvitations,
  cancelDashboardInvitation,
  // inviteToDashboard,
} from "@/features/dashboard/api";
import { getMembers, deleteMember } from "@/features/members/api";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardIdEdit() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dashboardId = Number(id);
  const queryClient = useQueryClient();

  const [inviteOpen, setInviteOpen] = useState(false);

  const colors = ["#7AC555", "#760DDE", "#FFA500", "#E876EA", "#76A5EA"];

  const [dashboardName, setDashboardName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#7AC555");

  const [members, setMembers] = useState<
    {
      id: number;
      userId: number;
      email: string;
      nickname: string;
      profileImageUrl?: string;
      isOwner?: boolean;
    }[]
  >([]);
  const [memberPage, setMemberPage] = useState(1);
  const [totalMemberPages, setTotalMemberPages] = useState(1);

  const [invites, setInvites] = useState<{ id: number; email: string }[]>([]);
  const [invitePage, setInvitePage] = useState(1);
  const [totalInvitePages, setTotalInvitePages] = useState(1);

  // 대시보드 초기 데이터 불러오기
  useEffect(() => {
    if (!dashboardId) return;
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardById(dashboardId);
        setDashboardName(data.title);
        setDisplayName(data.title);
        setSelectedColor(data.color);
      } catch (e) {
        console.error("대시보드 조회 실패", e);
      }
    };
    fetchDashboard();
  }, [dashboardId]);

  // 구성원 목록 불러오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const size = 4;
        const data = await getMembers(dashboardId, { page: memberPage, size });
        setMembers(data.members);
        setTotalMemberPages(Math.ceil(data.totalCount / size));
      } catch (e) {
        console.error("구성원 조회 실패", e);
      }
    };
    fetchMembers();
  }, [dashboardId, memberPage]);

  // 초대 내역 불러오기
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const size = 5;
        const data = await getDashboardInvitations(dashboardId, { page: invitePage, size });
        setInvites(
          data.invitations.map((inv) => ({
            id: inv.id,
            email: inv.invitee.email,
          })),
        );
        setTotalInvitePages(Math.ceil(data.totalCount / size));
      } catch (e) {
        console.error("초대 내역 조회 실패", e);
      }
    };
    fetchInvites();
  }, [dashboardId, invitePage]);

  // 대시보드 수정 함수
  const handleUpdateDashboard = async () => {
    const confirmUpdate = window.confirm("대시보드 이름을 변경하시겠습니까?");
    if (!confirmUpdate) return;

    try {
      await updateDashboard(dashboardId, {
        title: dashboardName,
        color: selectedColor,
      });

      setDisplayName(dashboardName);
      alert("대시보드가 성공적으로 수정되었습니다.");

      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", dashboardId] });
    } catch (e) {
      console.error("대시보드 수정 실패", e);
      alert("대시보드 수정에 실패했습니다.");
    }
  };

  // 대시보드 삭제 함수
  const handleDeleteDashboard = async () => {
    const confirmDelete = window.confirm("이 대시보드를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteDashboard(dashboardId);
      alert("대시보드가 성공적으로 삭제되었습니다!");
      router.push("/mydashboard");
    } catch (e) {
      console.error("대시보드 삭제 실패", e);
      alert("대시보드 삭제에 실패했습니다.");
    }
  };

  const handleDeleteMember = async (memberId: number) => {
    try {
      await deleteMember(dashboardId, memberId);
      const size = 5;
      const data = await getMembers(dashboardId, { page: memberPage, size });
      setMembers(data.members);
      setTotalMemberPages(Math.ceil(data.totalCount / size));
    } catch (e) {
      console.error("구성원 삭제 실패", e);
      alert("구성원 삭제에 실패했습니다.");
    }
  };

  const handleCancelInvitation = async (invitationId: number) => {
    try {
      await cancelDashboardInvitation(dashboardId, invitationId);
      alert("초대가 취소되었습니다!");
      const size = 5;
      const data = await getDashboardInvitations(dashboardId, { page: invitePage, size });
      setInvites(
        data.invitations.map((inv) => ({
          id: inv.id,
          email: inv.invitee.email,
        })),
      );
      setTotalInvitePages(Math.ceil(data.totalCount / size));
    } catch (e) {
      console.error("초대 취소 실패", e);
      alert("초대 취소에 실패했습니다.");
    }
  };

  return (
    <div className="bg-brand-gray-100 h-full p-6">
      {/* 전체 컨테이너 */}
      <div className="pc:max-w-155 flex w-full min-w-71 flex-col gap-[15px]">
        {/* 돌아가기 버튼 */}
        <Link
          href={`/dashboard/${dashboardId}`}
          className="tablet:text-base text-brand-gray-700 mb-1 flex text-left text-sm font-medium"
        >
          <img src="/icons/icon-arrow-left.svg" alt="돌아가기" className="mr-2" />
          돌아가기
        </Link>

        {/* 대시보드 이름 + 색상 */}
        <section className="tablet:px-7 tablet:py-8 rounded-lg bg-white px-4 py-5 shadow-sm">
          <h2 className="tablet:text-2xl mb-6 text-xl font-bold">{displayName}</h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label className="tablet:text-2lg text-lg font-medium">대시보드 이름</Label>
              <Input
                placeholder="대시보드 이름"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
              />
            </div>

            <div className="mb-6 flex items-center gap-2">
              {colors.map((c) => (
                <Chip
                  key={c}
                  variant="color"
                  color={c}
                  selected={c === selectedColor}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>

            <MyButton
              onClick={handleUpdateDashboard}
              color="buttonBlue"
              className="tablet:text-base h-[54px] w-full text-sm font-semibold"
            >
              변경
            </MyButton>
          </div>
        </section>

        {/* 구성원 리스트 */}
        <section className="tablet:p-6 rounded-lg bg-white px-4 py-5 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="tablet:text-2xl text-xl font-bold">구성원</h3>
            <div className="flex items-center gap-[15px]">
              <span className="tablet:text-sm text-brand-gray-700 text-xs">
                {totalMemberPages} 페이지 중 {memberPage}
              </span>
              <div className="[&>*]:mt-0 [&>*]:flex">
                <Pagination
                  page={memberPage}
                  setPage={setMemberPage}
                  totalPages={Math.max(totalMemberPages, 1)}
                />
              </div>
            </div>
          </div>
          {/* 라벨 */}
          <div>
            <Label className="text-brand-gray-400 text-sm">이름</Label>
          </div>
          <ul>
            {members.map((m, idx) => {
              const isOwner = m?.isOwner;

              return (
                <li
                  key={m.id}
                  className={`flex h-[70px] items-center justify-between py-3 ${
                    idx !== members.length - 1 ? "border-brand-gray-200 border-b" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={m.profileImageUrl || "/images/img-profile-sample.svg"}
                      alt={m.nickname}
                      className="h-[38px] w-[38px] rounded-full object-cover"
                    />
                    <span className="text-sm">{m.nickname}</span>
                  </div>
                  {!isOwner && (
                    <MyButton
                      onClick={() => handleDeleteMember(m.id)}
                      color="buttonBasic"
                      className="tablet:w-21 tablet:text-sm text-brand-blue-500 h-8 w-13 rounded-md px-3 py-1 text-xs font-medium"
                    >
                      삭제
                    </MyButton>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* 초대 내역 */}
        <section className="tablet:p-6 rounded-lg bg-white px-4 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="tablet:text-2xl text-xl font-bold">초대 내역</h3>
            <div className="flex items-center gap-[15px]">
              <span className="tablet:text-sm text-brand-gray-700 text-xs">
                {totalInvitePages} 페이지 중 {invitePage}
              </span>
              <div className="[&>*]:mt-0 [&>*]:flex">
                <Pagination
                  page={invitePage}
                  setPage={setInvitePage}
                  totalPages={Math.max(totalInvitePages, 1)}
                />
              </div>
              <MyButton
                onClick={() => setInviteOpen(true)}
                color="buttonBlue"
                className="tablet:flex hidden h-8 w-[105px] items-center justify-center gap-2 rounded-md text-sm"
              >
                <img src="/icons/icon-box-add-white.svg" alt="초대하기" className="h-4 w-4" />
                초대하기
              </MyButton>
            </div>
          </div>
          {/* 모바일 전용 라벨*/}
          <div className="tablet:hidden mt-4 mb-6 flex items-center justify-between">
            <Label className="text-brand-gray-400 mb-0 text-sm">이메일</Label>
            <MyButton
              onClick={() => setInviteOpen(true)}
              color="buttonBlue"
              className="flex h-[26px] w-[86px] items-center justify-center gap-2 rounded-md text-xs font-medium"
            >
              <img src="/icons/icon-box-add-white.svg" alt="초대하기" className="h-4 w-4" />
              초대하기
            </MyButton>
          </div>

          {/* tablet+ 전용 라벨 */}
          <div className="tablet:block mt-7 hidden">
            <Label className="text-brand-gray-400 mb-0 text-base">이메일</Label>
          </div>
          <ul>
            {invites.map((i, idx) => (
              <li
                key={i.id}
                className={`flex h-[70px] items-center justify-between py-3 ${
                  idx !== invites.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="text-sm">{i.email}</span>
                <MyButton
                  onClick={() => handleCancelInvitation(i.id)}
                  color="buttonBasic"
                  className="tablet:w-21 tablet:text-sm text-brand-blue-500 h-8 w-13 rounded-md px-3 py-1 text-xs font-medium"
                >
                  취소
                </MyButton>
              </li>
            ))}
          </ul>
        </section>

        {/* 삭제 버튼 */}
        <MyButton
          onClick={handleDeleteDashboard}
          color="buttonBasic"
          className="tablet:text-lg pc:mb-[33px] tablet:mb-12 tablet:w-80 tablet:h-[62px] text-brand-gray-700 mt-2 mb-25 h-13 w-full bg-white text-base font-medium"
        >
          대시보드 삭제하기
        </MyButton>

        {dashboardId !== undefined && (
          <InviteModal
            isOpen={inviteOpen}
            onClose={() => setInviteOpen(false)}
            dashboardId={dashboardId}
          />
        )}
      </div>
    </div>
  );
}
