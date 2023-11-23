// useApiData.ts
import { useEffect, useState } from 'react';
import { IProduct } from '../types/ProductsType';
import { ICartDetails } from '../types/CartModalType';


export type ApiData = IProduct | ICartDetails;

const useApiData = (apiUrl: string) => {
  const [data, setData] = useState<ApiData[]>([]);
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
      console.log("Error Fetching Data",error);
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

export default useApiData;
