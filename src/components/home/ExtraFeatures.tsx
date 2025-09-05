export default function ExtraFeatures() {
  const extraList = [
    {
      id: "extra1",
      src: "/images/img-main-extra1.png",
      title: "대시보드 설정",
      desc: "대시보드 사진과 이름을 변경할 수 있어요.",
    },
    {
      id: "extra2",
      src: "/images/img-main-extra2.png",
      title: "초대",
      desc: "새로운 팀원을 초대할 수 있어요.",
    },
    {
      id: "extra3",
      src: "/images/img-main-extra3.png",
      title: "구성원",
      desc: "구성원을 초대하고 내보낼 수 있어요.",
    },
  ];

  return (
    <div>
      <div className="tablet:mb-9 mb-10 text-center text-[22px] font-bold">
        생산성을 높이는 다양한 설정 ⚡
      </div>

      <div className="pc:flex-row pc:gap-8 tablet:gap-12 flex flex-col items-center gap-10">
        {extraList.map((item) => (
          <div key={item.id} className="tablet:max-w-[378px] max-w-[343px]">
            <div className="bg-brand-gray-600 tablet:h-[260px] tablet:px-[39px] flex h-[236px] items-center justify-center rounded-t-lg px-[42px]">
              <img src={item.src} alt="페이지 기능 이미지" />
            </div>
            <div className="tablet:py-8 bg-brand-gray-800 rounded-b-lg px-8 py-7">
              <div className="text-2lg mb-4 font-bold">{item.title}</div>
              <div className="text-lg font-medium">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
