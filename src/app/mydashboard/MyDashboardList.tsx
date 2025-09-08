"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import Chip from "@/components/chip/Chip";
import CreateDashboardModal from "@/components/CreateDashboardModal";
import Input from "@/components/form/Input";
import MyButton from "@/components/layout/Button";
import Pagination from "@/components/layout/Pagination";
import { Dashboard, Invitation } from "@/features/dashboard/types";

export default function MyDashboardList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredInvitations = invitations.filter((invite) => 
    invite.dashboard.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const teamId = "17-2";

  const router = useRouter();

  const fetchDashboards = useCallback(async (page: number) => {
    setLoading(true);
    try{
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch(
        `https://sp-taskify-api.vercel.app/${teamId}/dashboards?navigationMethod=pagination&page=${page}&size=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("대시보드 불러오기 실패");

      const data: { dashboards: Dashboard[]; totalCount: number } = await res.json();
      
      const sortedDashboards = (data.dashboards ?? []).sort(
        (a: Dashboard, b: Dashboard) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setDashboardList(sortedDashboards);
      setTotalPages(Math.ceil((data.totalCount ?? 0) / itemsPerPage));
    } catch (error){
      console.error(error);
    } finally{
      setLoading(false);
    }
  }, [teamId, itemsPerPage]);

  const fetchInvitations = useCallback(async () => {
    try{
      const token = localStorage.getItem("accessToken");
      if(!token) throw new Error("토큰 없음");

      const res = await fetch(`https://sp-taskify-api.vercel.app/${teamId}/invitations`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if(!res.ok) throw new Error("초대 목록 불러오기 실패!");

      const data = await res.json();
      console.log("초대 API 응답:", data);

      setInvitations(data.invitations ?? []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchDashboards(currentPage);
    fetchInvitations();
  }, [currentPage, fetchDashboards, fetchInvitations]);

  //초대 수락/거절
  const handleAcceptInvite = async (inviteId: number) => {
    const invite = invitations.find((inv) => inv.id === inviteId);
    if(!invite) return;

    try{
      const token = localStorage.getItem("accessToken");
      if(!token) throw new Error("토큰 없음");

      const res = await fetch(`https://sp-taskify-api.vercel.app/${teamId}/dashboards`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: invite.dashboard.title,
            color: "#7AC555",
          }),
        }
      );

      if (!res.ok) throw new Error("대시보드 생성 실패");

      const data = await res.json();
      console.log("생성된 대시보드: ", data);

      setDashboardList((prev) => [...prev, data]);
      setInvitations((prev) => prev.filter((inv) => inv.id !== inviteId));
      await fetchDashboards(1); //fetchDashboards 안에서 최신순 정렬 포함
      setCurrentPage(1);
    } catch(error){
      console.error(error);
      alert("초대 수락 중 오류가 발생했습니다.");
    }
  };

  const handleRejectInvite = async (inviteId: number) => {
    try{
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("토큰 없음");

      const res = await fetch(
        `https://sp-taskify-api.vercel.app/${teamId}/invitations/${inviteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("초대 거절 실패");

      setInvitations((prev) => prev.filter((inv) => inv.id !== inviteId));
    } catch (error){
      console.error(error);
      alert("초대 거절 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="bg-[#fafafa] py-[40px]">
      {/* 내 대시보드*/}
      <div className="w-[95%] mx-auto max-w-[1022px] min-h-[204px] pc:mx-0 pc:ml-[40px] overflow-hidden">
        <div className="grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3 gap-4 min-h-[156px]">
          <MyButton className="h-[70px] p-4 text-center font-semibold" color="buttonBasic" onClick={() => setIsModalOpen(true)}>
            새로운 대시보드 &nbsp; <Chip variant="add" size="sm"/> 
          </MyButton>

          {dashboardList.map((dashboard) => (
            <MyButton key={dashboard.id} className="h-[70px] p-4 text-left font-semibold" color="buttonBasic" onClick={() => router.push(`/dashboard/${dashboard.id}`)}>
      
              <div className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: dashboard.color }}
                  className="h-2 w-2 shrink-0 rounded-full"
                />
                <div>{dashboard.title}</div>
                {dashboard.createdByMe && (
                  <Image
                    src="/icons/icon-crown.svg"
                    alt="내가 만든 대시보드"
                    width={18}
                    height={14}
                  />
                )}
                &nbsp;{" "}
                <Image
                  src="/icons/icon-arrow-right.svg"
                  alt="내가 만든 대시보드"
                  width={18}
                  height={14}
                  className="ml-auto"
                />
              </div>
            </MyButton>
          ))}
        </div>

        <div className="float-right flex">
          <div className="mt-4 mr-4">
            {totalPages} 페이지 중 {currentPage}
          </div>
          <Pagination page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
        </div>

      </div>


      {/*초대 받은 대시보드 (before)*/}
      <div className="w-[95%] mx-auto max-w-[1022px] max-h-[650px] pc:mx-0 pc:ml-[40px] bg-white rounded-lg overflow-scroll mt-[30px]">
        <h2 className="text-2xl font-bold py-[32px] px-[28px]">초대 받은 대시보드</h2>

        <div className="px-[28px] pb-[16px]">
          <Input
            placeholder="검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            leftIcon={
              <Image src="/icons/icon-search.svg" alt="검색 아이콘" width={20} height={20} />
            }
          />
        </div>

        <div className="pc:block tablet:block hidden">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="w-1/3 px-[28px] py-2">이름</th>
                <th className="w-1/3 px-[28px] py-2">초대자</th>
                <th className="w-1/3 px-[28px] py-2">수락 여부</th>
              </tr>
            </thead>

          </table>
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm text-left border-collapse">
              <tbody>
                {filteredInvitations.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-400">
                      검색 결과가 없습니다. 
                      <Image src="/images/img-no-dashboard.svg" alt="없음" width={100} height={100} className="mx-auto mt-4 block" />
                    </td>
                  </tr>
                ) : (
                  filteredInvitations.map((invite) => (
                    <tr key={invite.id} className="border-b last:border-0">
                      <td className="py-[23px] w-1/3 px-[28px]">{invite.dashboard.title}</td>
                      <td className="py-[23px] w-1/3 px-[28px]">{invite.inviter.nickname}</td>
                      <td className="py-[23px] w-1/3 px-[28px]">
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
        </div>

        {/* 모바일 전용 */}
        <div className="pc:hidden tablet:hidden block space-y-4 px-[20px] pb-[20px]">
          {filteredInvitations.length === 0 ? (
            <div className="text-center text-gray-400">
              검색 결과가 없습니다.
              <Image
                src="/images/img-no-dashboard.svg"
                alt="없음"
                width={100}
                height={100}
                className="mx-auto mt-4 block"
              />
            </div>
          ) : (
            filteredInvitations.map((invite) => (
              <div key={invite.id} className="rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="mb-2">
                  <div className="text-sm text-gray-500">이름</div>
                  <div className="text-base font-semibold">{invite.dashboard.title}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">초대자</div>
                  <div className="text-base font-medium">{invite.inviter.nickname}</div>
                </div>
                <div className="flex gap-2">
                  <MyButton
                    className="w-full py-[4px] text-white"
                    color="buttonBlue"
                    onClick={() => handleAcceptInvite(invite.id)}
                  >
                    수락
                  </MyButton>
                  <MyButton
                    className="w-full py-[4px] text-[#4276EC]"
                    color="buttonBasic"
                    onClick={() => handleRejectInvite(invite.id)}
                  >
                    거절
                  </MyButton>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/*모달*/}

      <CreateDashboardModal open={isModalOpen} onClose={() => setIsModalOpen(false)} 
      onCreate={async (name, color) => {
        try{
          const token = localStorage.getItem("accessToken");
          if (!token) throw new Error("토큰이 없습니다");

          const res = await fetch(`https://sp-taskify-api.vercel.app/${teamId}/dashboards`,{
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: name, 
              color,
            }),
          });

          if(!res.ok) throw new Error("대시보드 생성 실패");

          const data = await res.json();
          console.log("생성된 대시보드:", data);

          setDashboardList((prev) => [...prev, data]);

          setIsModalOpen(false);
        } catch(error){
          console.error(error);
          alert("대시보드 생성 중 오류가 발생했습니다.");
        }
      
      }}>
      </CreateDashboardModal>

    </div>
  );
}
