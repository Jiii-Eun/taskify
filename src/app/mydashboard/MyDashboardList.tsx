"use client";

import { useState } from "react";

import Chip from "@/components/chip/Chip";
import Input from "@/components/form/Input";
import MyButton from "@/components/layout/Button";
import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/components/Modal";

interface Dashboard{
  id: string;
  title: string;
}

interface Invitation{
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee:{
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationResponse{
  cursorId: number;
  invitations: Invitation[];
}

const dashboards: Dashboard[] = [
  {id: "1", title: "Jennie"},
  {id: "2", title: "Lisa"},
  {id: "3", title: "Rose"},
  {id: "4", title: "Chaewon"},
  {id: "5", title: "Annie"},
  {id: "6", title: "Rei"},
  {id: "7", title: "Hyunjin"},
];

const mockResponse: InvitationResponse = {
  cursorId: 0,
  invitations: [
    {
      id: 1,
      inviter: {nickname: "Mark", email: "mark@nct.com", id: 100},
      teamId: "team-1",
      dashboard: { title: "프로덕트 디자인", id: 201 },
      invitee: { nickname: "You", email: "you@email.com", id: 999 },
      inviteAccepted: false,
      createdAt: "2025-09-03T15:54:08.171Z",
      updatedAt: "2025-09-03T15:54:08.171Z",
    },
    {
      id: 2,
      inviter: {nickname: "Felix", email: "felix@skz.com", id: 101},
      teamId: "team-2",
      dashboard: { title: "새로운 기획 문서", id: 202 },
      invitee: { nickname: "You", email: "you@email.com", id: 999 },
      inviteAccepted: false,
      createdAt: "2025-09-03T15:54:08.171Z",
      updatedAt: "2025-09-03T15:54:08.171Z",
    },
    {
      id: 3,
      inviter: {nickname: "Hayoung", email: "hayoung@fromis9.com", id: 102},
      teamId: "team-3",
      dashboard: { title: "유닛A", id: 203 },
      invitee: { nickname: "You", email: "you@email.com", id: 999 },
      inviteAccepted: false,
      createdAt: "2025-09-03T15:54:08.171Z",
      updatedAt: "2025-09-03T15:54:08.171Z",
    },
    {
      id: 4,
      inviter: {nickname: "Mark", email: "mark@nct.com", id: 103},
      teamId: "team-1",
      dashboard: { title: "프로덕트 디자인", id: 204 },
      invitee: { nickname: "You", email: "you@email.com", id: 999 },
      inviteAccepted: false,
      createdAt: "2025-09-03T15:54:08.171Z",
      updatedAt: "2025-09-03T15:54:08.171Z",
    },
    {
      id: 5,
      inviter: {nickname: "Felix", email: "felix@skz.com", id: 104},
      teamId: "team-2",
      dashboard: { title: "새로운 기획 문서", id: 205 },
      invitee: { nickname: "You", email: "you@email.com", id: 999 },
      inviteAccepted: false,
      createdAt: "2025-09-03T15:54:08.171Z",
      updatedAt: "2025-09-03T15:54:08.171Z",
    },
    {
      id: 6,
      inviter: {nickname: "Hayoung", email: "hayoung@fromis9.com", id: 105},
      teamId: "team-3",
      dashboard: { title: "유닛A", id: 206 },
      invitee: { nickname: "You", email: "you@email.com", id: 999 },
      inviteAccepted: false,
      createdAt: "2025-09-03T15:54:08.171Z",
      updatedAt: "2025-09-03T15:54:08.171Z",
    },
    {
      id: 7,
      inviter: {nickname: "Mark", email: "mark@nct.com", id: 106},
      teamId: "team-1",
      dashboard: { title: "프로덕트 디자인", id: 207 },
      invitee: { nickname: "You", email: "you@email.com", id: 999 },
      inviteAccepted: false,
      createdAt: "2025-09-03T15:54:08.171Z",
      updatedAt: "2025-09-03T15:54:08.171Z",
    },
    {
      id: 8,
      inviter: {nickname: "Felix", email: "felix@skz.com", id: 107},
      teamId: "team-2",
      dashboard: { title: "새로운 기획 문서", id: 208 },
      invitee: { nickname: "You", email: "you@email.com", id: 999 },
      inviteAccepted: false,
      createdAt: "2025-09-03T15:54:08.171Z",
      updatedAt: "2025-09-03T15:54:08.171Z",
    },
    {
      id: 9,
      inviter: {nickname: "Hayoung", email: "hayoung@fromis9.com", id: 108},
      teamId: "team-3",
      dashboard: { title: "유닛A", id: 209 },
      invitee: { nickname: "You", email: "you@email.com", id: 999 },
      inviteAccepted: false,
      createdAt: "2025-09-03T15:54:08.171Z",
      updatedAt: "2025-09-03T15:54:08.171Z",
    },
  ]
}

export default function MyDashboardList() {
  
  const [currentPage, setCurrentPage] = useState(1);

  const [dashboardList, setDashboardList] = useState<Dashboard[]>(dashboards);
  const [invitations, setInvitations] = useState<Invitation[]>(mockResponse.invitations);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(dashboardList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dashboardList.slice(startIndex, startIndex + itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState("");

  const handleAcceptInvite = (inviteId: number) => {
    const invite = invitations.find(inv => inv.id === inviteId);
    if(!invite) return;

    //내 대시보드 끝에 추가
    setDashboardList(prev => [...prev, {id: String(invite.dashboard.id), title: invite.dashboard.title}]);

    //초대 목록에서 제거
    setInvitations(prev => prev.filter(inv => inv.id !== inviteId));
  };

  const handleRejectInvite = (inviteId: number) => {
    setInvitations(prev => prev.filter(inv => inv.id !== inviteId));
  }

  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredInvitations = invitations.filter(invite => 
    invite.dashboard.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    invite.inviter.nickname.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    
    <div className="bg-[#fafafa] py-[40px]">

      {/* 내 대시보드*/}
      <div className="w-[1022px] mx-[40px] min-h-[204px]">
        <div className="grid grid-cols-3 gap-4 min-h-[156px]">
          <MyButton className="w-[332px] h-[70px] p-4 text-center font-semibold" color="buttonBasic" onClick={() => setIsModalOpen(true)}>
            새로운 대시보드 &nbsp; <Chip variant="add" size="sm"/> 
          </MyButton>
          {currentItems.map((item) => (
            <MyButton key={item.id} className="w-[332px] h-[70px] p-4 text-left font-semibold" color="buttonBasic" onClick={() => alert('대시보드 이동!')}>
              {item.title}
            </MyButton>
          ))}
        </div>

        {/* Pagination */}
        <div className="float-right py-[12px]">
          <span className="text-sm px-[16px]">
            {totalPages} 페이지 중 {currentPage}
          </span>
          <MyButton className="px-4 py-2" color="buttonBasic" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>&lt;</MyButton>
          <MyButton className="px-4 py-2" color="buttonBasic" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>&gt;</MyButton>
        </div>
      </div>

      {/* 초대 받은 대시보드*/}
      <div className="w-[1022px] m-[40px] max-h-[650px]  bg-white rounded-lg overflow-scroll">
        <h2 className="text-2xl font-bold py-[32px] px-[28px]">초대 받은 대시보드</h2>
        <div className="px-[28px] pb-[16px]">
          <Input placeholder="검색" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
        </div>

        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2 px-[76px] w-1/3">이름</th>
              <th className="py-2 px-[76px] w-1/3">초대자</th>
              <th className="py-2 px-[76px] w-1/3">수락 여부</th>
            </tr>
          </thead>
          <tbody className="max-h-[450px] overflow-y-auto">
            
            {filteredInvitations.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-400">아직 초대 받은 대시보드가 없어요 </td>
              </tr>
            ) : (
            
            filteredInvitations.map((invite) => (
              <tr key={invite.id} className="border-b last:border-0">
                <td className="px-[76px] py-[23px] w-1/3">{invite.dashboard.title}</td>
                <td className="px-[76px] py-[23px] w-1/3">{invite.inviter.nickname}</td>
                <td className="px-[76px] py-[23px] w-1/3">
                  <div className="flex gap-2">
                    <MyButton className="py-[4px] px-[29.5px] text-white" color="buttonBlue" onClick={() => handleAcceptInvite(invite.id)}>수락</MyButton>
                    <MyButton className="py-[4px] px-[29.5px] text-[#4276EC]" color="buttonBasic" onClick={() => handleRejectInvite(invite.id)}>거절</MyButton>
                  </div>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>

      </div>

      {/*모달*/}
      {isModalOpen && (
        <Modal open={isModalOpen} size="lg" className="w-[584px] h-[344px]">
          <ModalHeader title="새로운 대시보드" />
          <ModalContext>
            <span>대시보드 이름</span>
            <input type="text" className="w-full border border-gray-300 rounded p-2" placeholder="대시보드 이름을 입력해주세요." value={newDashboardName} onChange={(e) => setNewDashboardName(e.target.value)} />
            <Chip variant="color" color="#FF0000" size="md" selected={true} onClick={() => console.log("색상 클릭!")}/>
          </ModalContext>
          <ModalFooter>
            <MyButton color="buttonBasic" className="w-[256px] h-[54px]" onClick={() => setIsModalOpen(false)}>취소</MyButton>
            <MyButton color="buttonBlue" className="w-[256px] h-[54px] text-white" onClick={() => {alert("생성!"); setIsModalOpen(false);}}>생성</MyButton>
          </ModalFooter>
        </Modal>
      )}
    </div>

  );
}