
import { FavDataType } from "../types/FavDataType";
import { useEffect, useState } from "react";

export type FavData = FavDataType;

const useFavData = (apiUrl: string) => {
    const [data, setData] = useState<FavData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData.data);
            }
        } catch (error) {
            console.log("Error Fetching Data", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [apiUrl]);

    const refetch = () => {
        fetchData();
    };

    return { data, isLoading, refetch };
};

export default useFavData;