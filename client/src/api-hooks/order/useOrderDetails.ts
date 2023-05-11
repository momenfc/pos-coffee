import { useQuery } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useOrderDetails(orderId?: string) {
  const api = useApi();

  const http = async () => {
    if (!orderId) return null;
    const res = await api.get(`/orders/${orderId}`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.orderDetails], http, {
    onSuccess: undefined,
  });

  const orderDetails: OrderItem = data?.data?.data;

  return {
    orderDetails,
    orderDetailsLod: isLoading,
  };
}

export default useOrderDetails;
