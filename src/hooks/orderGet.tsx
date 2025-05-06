import { useEffect, useState } from 'react';
import { IPayment } from '../types/PaymentType';
import { baseUrl } from '../routes/Routes';

const usePaymentInfo = (userEmail: string) => {
  const [order, setOrder] = useState<IPayment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = userEmail === 'gadgetsailoradmin@gmail.com'
          ? `${baseUrl}/getPayment`
          : `${baseUrl}/getPayment/${userEmail}`;
        const response = await fetch(url);
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
