import { useState, useCallback } from "react"

import type { AppError } from "../types"

export function useFetchData<T, P extends any[]>(fetchFunction: (...args: P) => Promise<T>, params: P) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<AppError | null>(null)
  
    const fetchData = useCallback(async function(){
      setIsLoading(true);

      try {
        const result: T = await fetchFunction(...params);
        
        if('isError' in (result as AppError) && (result as AppError).isError){
          throw new Error((result as AppError).message);
        }

        setData(result);
        return result;
      } catch (error) {
        setError({ isError: true, message: (error as Error).message ?? 'Failed to fetch media.' });
        console.error("Failed to fetch media:", error);
      } finally {
        setIsLoading(false);
      }
  
    }, [fetchFunction, JSON.stringify(params)])

    return { data, isLoading, error, fetchData }
}
