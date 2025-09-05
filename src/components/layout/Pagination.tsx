"use client";

import PaginationButton from "./PaginationButton";

type dataProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

export default function Pagination({ page, setPage, totalPages }: dataProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="tablet:flex mt-4 hidden">
      <PaginationButton
        direction={"prev"}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />

      <PaginationButton
        direction={"next"}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      />
    </div>
  );
}
