import { cn } from "../../utils/helperClassName";

import Button from "./Button";

interface PaginationProps {
  curPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ curPage, totalPages, onPageChange, className }: PaginationProps){
  return (
    <div className={cn("pagination flex justify-center items-center gap-2", className)}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
        return (
          <Button 
            key={page}
            className={cn("py-1 px-3", {"opacity-50 cursor-not-allowed": page === curPage })}
            onClick={() => onPageChange(page)}
            disabled={page === curPage}
          >
            {page}
          </Button>
        )
      })}
    </div>
  );
}
