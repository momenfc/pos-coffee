import { useQuery } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useStock() {
  const api = useApi();

  const http = async () => {
    const res = await api.get(`/stock`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.stock], http, {
    onSuccess: undefined,
  });
  // console.log('useStock  data:', data);

  const stock = data?.data?.stock;

  return {
    stock,
    stockLod: isLoading,
  };
}

export default useStock;
