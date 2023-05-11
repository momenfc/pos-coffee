import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useStockUpdate() {
  const api = useApi();
  const client = useQueryClient();

  const http = async ({
    data,
    onSuc,
  }: {
    data: any;
    onSuc?: (res: any) => void;
  }) => {
    const res = await api.patch(`/stock`, data);
    if (res.status === 'succes') {
      onSuc && onSuc(res);
    }
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSuccess: () => {
      client.invalidateQueries([queryKeys.stock]);
      message.success('Stock has been updated successfully');
    },
  });

  return {
    stockUpdate: mutate,
    stockUpdateLod: isLoading,
  };
}

export default useStockUpdate;
