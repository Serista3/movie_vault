import { useSearchParams } from "react-router";

export function usePagination(total_page: number){
    const [searchParams, setSearchParams] = useSearchParams();
    const curPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const totalPages = Math.min(total_page, 200);

    const handlePageChange = function(newPage: number){
        setSearchParams(searchParams => {
            searchParams.set('page', newPage.toString());
            return searchParams;
        });
    }

    return {
        curPage,
        totalPages,
        handlePageChange
    }
}