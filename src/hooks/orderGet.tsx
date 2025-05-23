import { useEffect, useState } from 'react';
import { IPayment } from '../types/PaymentType';

const usePaymentInfo = (userEmail: string) => {
  const [order, setOrder] = useState<IPayment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = userEmail === 'gadgetsailoradmin@gmail.com' 
        ? 'https://gadget-sailor-backend.onrender.com/api/v1/getPayment' 
        : `https://gadget-sailor-backend.onrender.com/api/v1/getPayment/${userEmail}`;
        const response = await fetch(url);
        // const response = await fetch(`https://gadget-sailor-backend.onrender.com/api/v1/getPayment/${userEmail}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');

        }

        const result = await response.json();
        const info = result.data;
        setOrder(info);
      } catch (error) {
        throw new Error("Network response failed: " + JSON.stringify(error));
      }
    };

    fetchData();

  }, [userEmail]);

  return order;
};

export default usePaymentInfo;
