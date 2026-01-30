import { cn } from "../../utils/helperClassName";
import { usePagination } from "../../hooks/usePagination";

import Button from "./Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

interface PaginationProps {
  curPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const DEFAULT_BTN_PAGE_CLASS = "py-.75 px-2 rounded-md";

export default function Pagination({ curPage, totalPages, onPageChange, className }: PaginationProps){
  const { 
    pagesToShow,
    isSecondFirstPage, 
    isSecondLastPage, 
    isFirstPage, 
    isLastPage 
  } = usePagination(curPage, totalPages);

  // Helper to create page button
  const pageBtn = function(page: number): React.ReactElement{
    return (
      <Button 
        key={page}
        className={cn(DEFAULT_BTN_PAGE_CLASS, {"opacity-50 cursor-auto": page === curPage })}
        onClick={() => onPageChange(page)}
        disabled={page === curPage}
      >
        {page}
      </Button>
    )
  };

  return (
    <div className={cn("pagination flex justify-center items-center gap-2", className)}>
      <button className="cursor-pointer" disabled={isFirstPage} onClick={() => onPageChange(curPage - 1)}>
        <MdKeyboardArrowLeft 
          size={26} 
          className={cn("text-primary-light", isFirstPage && "opacity-50 cursor-not-allowed")} 
        />
      </button>
      {pageBtn(1)}
      {isSecondFirstPage && <BsThreeDots className="text-tertiary-dark" />}
      {pagesToShow.map(page => pageBtn(page))}
      {isSecondLastPage && curPage < totalPages - 2 && <BsThreeDots className="text-tertiary-dark" />}
      {totalPages != 1 && pageBtn(totalPages)}
      <button className="cursor-pointer" disabled={isLastPage} onClick={() => onPageChange(curPage + 1)}>
        <MdKeyboardArrowRight 
          size={26} 
          className={cn("text-primary-light", isLastPage && "opacity-50 cursor-not-allowed")} 
        />
      </button>
    </div>
  );
}
