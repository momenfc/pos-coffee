import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useOrderDelete() {
  const api = useApi();
  const client = useQueryClient();

  const http = async ({
    orderId,
    onSuc,
  }: {
    orderId: string;
    onSuc?: (res: any) => void;
  }) => {
    const res = await api.delete(`/orders/${orderId}`);
    if (res.status === 'succes') {
      onSuc && onSuc(res);
    }
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.orderList]);
    },
  });

  return {
    orderDelete: mutate,
    orderDeleteLod: isLoading,
  };
}

export default useOrderDelete;
