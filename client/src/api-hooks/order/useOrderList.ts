import { useQuery } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useOrderList() {
  const api = useApi();

  const http = async () => {
    const res = await api.get(`/orders`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.orderList], http, {
    onSuccess: undefined,
  });
  // console.log('useOrderList  data:', data);

  const orderList = data?.data?.data;

  return {
    orderList,
    orderListLod: isLoading,
  };
}

export default useOrderList;
