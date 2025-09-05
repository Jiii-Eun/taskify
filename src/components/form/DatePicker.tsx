import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils/cn";

import { base } from "./ControlStyles";

export default function CalendarCommon() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="relative">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        wrapperClassName="w-full m-0"
        className={cn(base, "h-12 cursor-pointer pr-4 pl-11")}
      />
      <Image
        src="/icons/icon-calender.svg"
        width={20}
        height={20}
        alt="달력아이콘"
        className="pointer-events-none absolute top-[13px] left-4"
      />
    </div>
  );
}
