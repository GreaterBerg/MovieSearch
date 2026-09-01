import { useEffect, useState } from "react"

function useDebounce<T>(query: T, delay: number):T {
    const [debouncedValue, setDebouncedValue] = useState<T>(query);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(query)
        }, delay);

        return () => clearTimeout(timer)
    }, [query, delay])
    
    return debouncedValue;
}

export default useDebounce