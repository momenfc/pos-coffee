import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useProductEdit() {
  const api = useApi();
  const client = useQueryClient();

  const http = async ({
    productId,
    data,
    onSuc,
  }: {
    productId: string;
    data: any;
    onSuc?: (res: any) => void;
  }) => {
    const res = await api.patch(`/products/${productId}`, data);
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
    productEdit: mutate,
    productEditLod: isLoading,
  };
}

export default useProductEdit;
