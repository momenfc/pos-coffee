import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useProductAdd() {
  const api = useApi();
  const client = useQueryClient();

  const http = async ({
    data,
    onSuc,
  }: {
    data: any;
    onSuc?: (res: any) => void;
  }) => {
    const res = await api.post(`/products`, data);
    if (res.status === 'succes') {
      onSuc && onSuc(res);
    }
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.productList]);
    },
  });

  return {
    productAdd: mutate,
    productAddLod: isLoading,
  };
}

export default useProductAdd;
