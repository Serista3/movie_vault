const MAX_PAGES_TO_SHOW = 5;

const getTotalShowPage = function(curPage: number, totalPages: number){
    // Determine which page numbers to show in the pagination component
    switch (true){
    case totalPages <= MAX_PAGES_TO_SHOW:
        return Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p !== 1 && p !== totalPages);
    case curPage <= 3:
        return [2, 3, 4];
    case curPage >= totalPages - 2:
        return [totalPages - 3, totalPages - 2, totalPages - 1];
    default:
        return [curPage - 1, curPage, curPage + 1];
    }
}

export function computePagination(curPage: number, totalPages: number){
    const pagesToShow = getTotalShowPage(curPage, totalPages);
    const isSecondFirstPage = !pagesToShow.includes(2) && totalPages > MAX_PAGES_TO_SHOW;
    const isSecondLastPage = !pagesToShow.includes(totalPages - 1) && totalPages > MAX_PAGES_TO_SHOW;
    const isFirstPage = curPage === 1;
    const isLastPage = curPage === totalPages;

    return {
        pagesToShow,
        isSecondFirstPage,
        isSecondLastPage,
        isFirstPage,
        isLastPage
    };
}