import { useState } from "react"

import type { AppError } from "../types"

export function useFetchData<T, P>(fetchFunction: Function, params: P[]) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<AppError | null>(null)
  
    const fetchData = async function(){
      setIsLoading(true);

      try {
        const result: T = await fetchFunction(...params);
        setData(result);
      } catch (error) {
        setError({ isError: true, message: 'Failed to fetch media.' });
        console.error("Failed to fetch media:", error);
      }
  
      setIsLoading(false);
    }

    return { data, isLoading, error, fetchData }
}
