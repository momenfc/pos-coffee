import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useProductDelete() {
  const api = useApi();
  const client = useQueryClient();

  const http = async ({
    productId,
    onSuc,
  }: {
    productId: string;
    onSuc?: (res: any) => void;
  }) => {
    const res = await api.delete(`/products/${productId}`);
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
    productDelete: mutate,
    productDeleteLod: isLoading,
  };
}

export default useProductDelete;
