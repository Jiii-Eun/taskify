"use client";

import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { offset, shift, size } from "@floating-ui/dom";
import { cn } from "@/lib/utils/cn";
import { base } from "./ControlStyles";

type CalendarCommonProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
};

export default function CalendarCommon({ value, onChange }: CalendarCommonProps) {
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const isSameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();
  const inRange = (t: Date, a: Date, b: Date) => {
    const tt = startOfDay(t).getTime();
    const x = startOfDay(a).getTime();
    const y = startOfDay(b).getTime();
    return tt >= Math.min(x, y) && tt <= Math.max(x, y);
  };
  const today = startOfDay(new Date());
  const monthLabel = (d: Date) => d.toLocaleString("ko-KR", { year: "numeric", month: "long" });

  const dayClassName = (date: Date) => {
    if (!value) return "";
    const k: string[] = [];
    if (inRange(date, today, value)) k.push("tp-range");
    if (isSameDay(date, today)) k.push("tp-range-start");
    if (isSameDay(date, value)) k.push("tp-range-end");
    return k.join(" ");
  };

  return (
    <div className="relative">
      <DatePicker
        selected={value}
        onChange={onChange}
        wrapperClassName="w-full m-0"
        className={cn(base, "h-12 cursor-pointer pr-4 pl-11")}
        dateFormat="yyyy-MM-dd HH:mm"
        timeFormat="HH:mm"
        showTimeSelect
        timeIntervals={30}
        timeCaption="시간"
        calendarClassName="tp-calendar"
        popperClassName="tp-popper"
        dayClassName={dayClassName}
        withPortal
        portalId="dp-portal-root"
        popperPlacement="bottom"
        placeholderText="날짜를 선택하세요"
        popperModifiers={[
          offset(8),
          shift({ padding: 8 }),
          size({
            apply({ availableHeight, elements }) {
              elements.floating.style.maxHeight = `${availableHeight - 16}px`;
            },
          }),
        ]}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="tp-cal-header">
            <button
              type="button"
              className="tp-cal-nav tp-cal-nav-left"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              aria-label="이전 달"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15 6L9 12L15 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="tp-cal-title">{monthLabel(date)}</div>
            <button
              type="button"
              className="tp-cal-nav tp-cal-nav-right"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              aria-label="다음 달"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      />

      <Image
        src="/icons/icon-calender.svg"
        width={20}
        height={20}
        alt="달력아이콘"
        className="pointer-events-none absolute top-[13px] left-4"
      />

      <style jsx global>{`
        :root {
          --dp-header-h: 48px;
          --dp-cell: 2.4rem;
          --dp-header-font-size: 20px;
          --dp-header-font-weight: 700;
          --range-bg: #e2ecff;
          --selected-bg: #2661e8;
          --selected-bg-hover: #1f55cc;
          --scroll-thumb: rgba(0, 0, 0, 0.35);
        }
        [data-theme="dark"] {
          --range-bg: rgba(38, 97, 232, 0.18);
          --scroll-thumb: rgba(255, 255, 255, 0.35);
        }
        .tp-popper {
          z-index: 2147483647 !important;
        }
        .tp-popper .react-datepicker__triangle {
          display: none !important;
        }

        .tp-calendar .react-datepicker {
          position: relative !important;
          overflow: visible !important;
        }
        .tp-calendar .react-datepicker__navigation {
          display: none !important;
        }
        .tp-calendar .react-datepicker__header {
          background: #fff !important;
          border-bottom: none !important;
          height: var(--dp-header-h);
          padding: 0 !important;
          overflow: visible !important;
        }
        .tp-calendar .tp-cal-header {
          height: var(--dp-header-h);
          display: grid;
          grid-template-columns: 32px 1fr 32px;
          align-items: center;
        }
        .tp-calendar .tp-cal-title {
          grid-column: 2;
          justify-self: center;
          font-size: var(--dp-header-font-size);
          font-weight: var(--dp-header-font-weight);
          color: var(--text-primary, #334155);
          line-height: var(--dp-header-h);
        }
        .tp-calendar .tp-cal-nav {
          width: 32px;
          height: 32px;
          border: 0;
          background: transparent;
          color: var(--text-primary, #334155);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
        .tp-calendar .tp-cal-nav-left {
          grid-column: 1;
          justify-self: start;
        }
        .tp-calendar .tp-cal-nav-right {
          grid-column: 3;
          justify-self: end;
        }

        .tp-calendar .react-datepicker__time-container {
          background: #fff !important;
          border-left: 1px solid var(--border, #e5e7eb) !important;
        }
        .tp-calendar .react-datepicker__time-container .react-datepicker__header {
          background: #fff !important;
          border-bottom: none !important;
          height: var(--dp-header-h);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 !important;
        }
        .tp-calendar .react-datepicker-time__header {
          font-size: var(--dp-header-font-size) !important;
          font-weight: var(--dp-header-font-weight) !important;
          color: var(--text-primary, #334155) !important;
          line-height: var(--dp-header-h) !important;
          margin: 0 !important;
          text-align: center !important;
        }

        .tp-calendar .react-datepicker__day-names,
        .tp-calendar .react-datepicker__week {
          display: grid !important;
          grid-template-columns: repeat(7, var(--dp-cell));
          justify-content: center;
          margin: 0 !important;
        }
        .tp-calendar .react-datepicker__day-name,
        .tp-calendar .react-datepicker__day {
          width: var(--dp-cell) !important;
          line-height: var(--dp-cell) !important;
          margin: 0 !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
        .tp-calendar .react-datepicker__day-name {
          color: var(--text-muted, #94a3b8) !important;
          font-weight: 500;
        }

        .tp-calendar .tp-range {
          background: var(--range-bg) !important;
        }
        .tp-calendar .tp-range-start {
          border-top-left-radius: 9999px;
          border-bottom-left-radius: 9999px;
        }
        .tp-calendar .tp-range-end {
          border-top-right-radius: 9999px;
          border-bottom-right-radius: 9999px;
        }

        .tp-calendar .react-datepicker__day--selected,
        .tp-calendar .react-datepicker__day--keyboard-selected {
          background: var(--selected-bg) !important;
          color: #fff !important;
          border-radius: 8px;
        }
        .tp-calendar .react-datepicker__day--selected:hover,
        .tp-calendar .react-datepicker__day--keyboard-selected:hover {
          background: var(--selected-bg-hover) !important;
        }
        .tp-calendar .react-datepicker__time-list-item--selected {
          background: var(--selected-bg) !important;
          color: #fff !important;
        }

        .tp-calendar .react-datepicker__time-container,
        .tp-calendar .react-datepicker__time-container .react-datepicker__header,
        .tp-calendar .react-datepicker__time,
        .tp-calendar .react-datepicker__time-box {
          border: 0 !important;
          box-shadow: none !important;
        }
        .tp-calendar .react-datepicker__time-list {
          scrollbar-width: thin;
          scrollbar-color: var(--scroll-thumb) transparent;
          padding-right: 4px;
        }
        .tp-calendar .react-datepicker__time-list::-webkit-scrollbar {
          width: 8px;
        }
        .tp-calendar .react-datepicker__time-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .tp-calendar .react-datepicker__time-list::-webkit-scrollbar-thumb {
          background: var(--scroll-thumb);
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        @media (max-width: 640px) {
          .tp-calendar .react-datepicker {
            width: min(100vw - 24px, 360px) !important;
            max-height: calc(100dvh - 24px) !important;
          }
          .tp-calendar .react-datepicker__month-container,
          .tp-calendar .react-datepicker__time-container {
            float: none !important;
            width: 100% !important;
          }
          .tp-calendar .react-datepicker__month-container {
            max-height: 48dvh;
            overflow-y: auto;
          }
          .tp-calendar .react-datepicker__time-container {
            border-left: 0 !important;
            border-top: 1px solid var(--border, #e5e7eb) !important;
            max-height: 40dvh;
            overflow-y: auto;
          }
          :root {
            --dp-header-h: 44px;
            --dp-cell: 2.1rem;
          }
        }
      `}</style>
    </div>
  );
}
