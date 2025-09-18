"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Chip from "@/components/common/chip/Chip";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import InviteModal from "@/components/modal/InviteModal";
import MyButton from "@/components/common/Button";
import { useQueryClient } from "@tanstack/react-query";
import {
  getDashboardById,
  updateDashboard,
  deleteDashboard,
  getDashboardInvitations,
  cancelDashboardInvitation,
} from "@/features/dashboard/api";
import { getMembers, deleteMember } from "@/features/members/api";

import InviteList from "@/components/common/dashboard/edit/InviteList";
import MembersList from "@/components/common/dashboard/edit/MembersList";

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
        <MembersList
          members={members}
          page={memberPage}
          totalPages={totalMemberPages}
          setPage={setMemberPage}
          onDeleteMember={handleDeleteMember}
        />

        {/* 초대 내역 */}
        <InviteList
          invites={invites}
          page={invitePage}
          totalPages={totalInvitePages}
          setPage={setInvitePage}
          onCancel={handleCancelInvitation}
          onOpenInviteModal={() => setInviteOpen(true)}
        />

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
