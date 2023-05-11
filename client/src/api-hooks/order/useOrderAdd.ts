import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useOrderAdd() {
  const api = useApi();
  const client = useQueryClient();
  // interface Item {
  //   id: string;
  //   qty: number;
  // }
  // interface Data {
  //   items: Item[];
  // }

  const http = async ({
    data,
    onSuc,
  }: {
    data: any;
    onSuc?: (res: any) => void;
  }) => {
    const res = await api.post(`/orders`, data);
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
    orderAdd: mutate,
    orderAddLod: isLoading,
  };
}

export default useOrderAdd;
