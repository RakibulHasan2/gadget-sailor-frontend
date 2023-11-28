import { useEffect, useState } from 'react';
import { ReviewType } from '../types/ReviewType';

const useReviewData = (apiUrl: string) => {
  const [data, setData] = useState<ReviewType[]>([]);
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

  const refetchReview = () => {
    fetchData();
  };

  return { data, isLoading, refetchReview };
};

export default useReviewData;
