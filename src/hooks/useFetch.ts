import {useEffect, useState} from "react";

interface FetchState {
    data: any,
    error: Error | null,
    isLoading: boolean

}

export const useFetch = (path: string): FetchState => {

    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    

    useEffect(() => {
        const fetchFn = async () => {
            try{
                const res = await fetch(path)
                if(!res.ok)
                    throw new Error(res.statusText)

                const result = res.json
                setData(result)
    
            }catch(err){
                console.log(err)
                setError(err as Error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchFn();
    }, [])

    return {data, error, isLoading}
    
}