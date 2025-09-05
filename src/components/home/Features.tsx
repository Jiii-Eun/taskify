import { cn } from "@/lib/utils/cn";

export default function Features() {
  const pointList = [
    {
      point: "Point 1",
      desc: (
        <>
          일의 <span className="text-brand-gray-300">우선순위</span>를
          <br />
          관리하세요
        </>
      ),
      src: "/images/img-main-point1.png",
      cardStyle: cn("pc:flex-row"),
      imgStyle: cn("tablet:pl-32 pl-12 pc:pl-0"),
    },
    {
      point: "Point 2",
      desc: (
        <>
          해야 할 일을
          <br />
          등록하세요
        </>
      ),
      src: "/images/img-main-point2.png",
      cardStyle: cn("pc:flex-row-reverse"),
      imgStyle: cn("tablet:px-36 pc:pl-36 pc:pr-10"),
    },
  ];

  return (
    <div className="w-full">
      {pointList.map((item) => (
        <div
          key={item.point}
          className={cn(
            item.cardStyle,
            "bg-brand-gray-800 pc:pt-24 mb-[90px] flex flex-col rounded-lg",
          )}
        >
          <div className="tablet:items-start tablet:mb-56 tablet:text-left pc:mb-0 tablet:pl-14 mb-48 flex flex-1 flex-col items-center text-center">
            <span className="text-2lg text-brand-gray-400 tablet:pb-24 pc:pt-5 block py-14 font-medium">
              {item.point}
            </span>
            <p className="tablet:text-5xl tablet:leading-16 text-4xl leading-12 font-bold">
              {item.desc}
            </p>
          </div>
          <div className="flex-1">
            <img src={item.src} alt={item.point} className={cn(item.imgStyle, "h-full w-full")} />
          </div>
        </div>
      ))}
    </div>
  );
}
