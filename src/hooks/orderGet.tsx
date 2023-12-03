import { useEffect, useState } from 'react';
import { IPayment } from '../types/PaymentType';



const usePaymentInfo = (userEmail: string) => {
  const [order, setOrder] = useState<IPayment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/getPayment/${userEmail}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const info = result.data[0];
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
