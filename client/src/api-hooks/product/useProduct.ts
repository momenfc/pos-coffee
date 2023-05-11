import { useQuery } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useProduct(productId: string) {
  const api = useApi();

  const http = async () => {
    const res = await api.get(`/products/${productId}`);
    return res;
  };

  const { data, isLoading, refetch } = useQuery(
    [queryKeys.product, productId],
    http,
    {
      enabled: !!productId,
      onSuccess: undefined,
    }
  );
  // console.log('useProduct  data:', data);

  const product = data?.data?.data;

  return {
    product,
    productLod: isLoading,
    productRefetch: refetch,
  };
}

export default useProduct;
