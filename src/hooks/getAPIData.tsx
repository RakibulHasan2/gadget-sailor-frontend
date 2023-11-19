// useApiData.ts
import { useEffect, useState } from 'react';
import { IProduct } from '../types/ProductsType';
import { ICartDetails } from '../types/CartModalType';

export type ApiData = IProduct | ICartDetails; 

const useApiData = (apiUrl: string) => {
  const [data, setData] = useState<ApiData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData.data);
        } 
      } catch (error) {
        // Handle fetch or parsing error here.
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, isLoading };
};

export default useApiData;
