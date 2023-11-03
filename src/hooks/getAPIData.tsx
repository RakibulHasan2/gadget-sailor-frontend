// useApiData.ts
import { useEffect, useState } from 'react';

// Define the data type that matches your API response.
type ApiData = object; // Replace YourApiDataType with your actual data type.

const useApiData = (apiUrl: string) => {
  // Define state to store the fetched data.
  const [data, setData] = useState<ApiData[]>([]);

  // Define a loading state to indicate when data is being fetched.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData.data);
        } else {
          // Handle API error here, e.g., set an error state.
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
