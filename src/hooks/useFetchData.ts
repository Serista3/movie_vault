import { useState, useCallback } from "react"

import type { AppError } from "../types"

export function useFetchData<T, P extends unknown[]>(fetchFunction: (...args: P) => Promise<T>, params: P) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<AppError | null>(null)
  
    const fetchData = useCallback(async function(){
      setIsLoading(true);

      try {
        const result: T = await fetchFunction(...params);
        
        if('isError' in (result as AppError) && (result as AppError).isError){
          throw result;
        }

        setData(result);
        return result;
      } catch (error) {
        setError(error as AppError);
        console.error("Failed to fetch media:", error);
      } finally {
        setIsLoading(false);
      }
  
    }, [fetchFunction, params])

    return { data, isLoading, error, fetchData }
}
