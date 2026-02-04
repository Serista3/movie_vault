// --- HELPERS ---
import { cn } from "../../utils/helperClassName";
import { computePagination } from "../../utils/helperPagination";

// --- COMPONENTS ---
import Button from "./Button";

// --- ICONS ---
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

// --- TYPES FOR PAGINATION PROPS ---
interface PaginationProps {
  curPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const DEFAULT_BTN_PAGE_CLASS = "py-.75 px-2 rounded-md";

export default function Pagination({ curPage, totalPages, onPageChange, className }: PaginationProps){
  // --- COMPUTED PAGINATION VALUES ---
  const { 
    pagesToShow,
    isSecondFirstPage, 
    isSecondLastPage, 
    isFirstPage, 
    isLastPage 
  } = computePagination(curPage, totalPages);

  // --- CREATE PAGE BUTTON ---
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

  // --- COMPUTED CLASS NAMES ---
  const wrapperClass = cn(
    "pagination flex justify-center items-center gap-2",
    className
  );

  const arrowLeftIconClass = cn(
    "text-primary-light",
    isFirstPage && "opacity-50 cursor-not-allowed"
  );

  const arrowRightIconClass = cn(
    "text-primary-light",
    isLastPage && "opacity-50 cursor-not-allowed"
  );

  return (
    <div className={wrapperClass}>
      {/* --- BUTTON PREVIOUS --- */}
      <button 
        className="cursor-pointer" 
        disabled={isFirstPage} 
        onClick={() => onPageChange(curPage - 1)}
      >
        <MdKeyboardArrowLeft size={26} className={arrowLeftIconClass} />
      </button>

      {/* --- FIRST PAGE BUTTON --- */}
      {pageBtn(1)}

      {/* --- DOT FIRST --- */}
      {isSecondFirstPage && <BsThreeDots className="text-tertiary-dark" />}

      {/* --- PAGE BUTTONS --- */}
      {pagesToShow.map(page => pageBtn(page))}

      {/* --- DOT LAST --- */}
      {isSecondLastPage && curPage < totalPages - 2 && <BsThreeDots className="text-tertiary-dark" />}

      {/* --- LAST PAGE BUTTON --- */}
      {totalPages != 1 && pageBtn(totalPages)}

      {/* --- BUTTON NEXT --- */}
      <button 
        className="cursor-pointer" 
        disabled={isLastPage}
        onClick={() => onPageChange(curPage + 1)}
      >
        <MdKeyboardArrowRight size={26} className={arrowRightIconClass} />
      </button>
    </div>
  );
}