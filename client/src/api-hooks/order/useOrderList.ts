import { useQuery } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import useSearchQuery from 'hooks/useSearchQuery';
import { queryKeys } from 'services/react-query/queryKeys';

function useOrderList() {
  const api = useApi();
  const { searchQueryStr } = useSearchQuery();

  const http = async () => {
    const res = await api.get(`/orders?${searchQueryStr}`);
    return res;
  };

  const { data, isLoading } = useQuery(
    [queryKeys.orderList, searchQueryStr],
    http,
    {
      onSuccess: undefined,
    }
  );
  // console.log('useOrderList  data:', data);

  const orderList = data?.data?.data;

  return {
    orderList,
    orderListLod: isLoading,
  };
}

export default useOrderList;
