import { useQuery } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';
import { useAppDispatch } from 'services/store/configureStore';
import { setCategoryList } from 'services/store/reducers/category';

function useProductList() {
  const api = useApi();
  const dispatch = useAppDispatch();

  const http = async () => {
    const res = await api.get(`/products`);
    return res;
  };

  const { data, isLoading, refetch } = useQuery([queryKeys.productList], http, {
    onSuccess: data => {
      const categoryList = data?.data?.data?.map(
        (product: Product) => product.category
      );

      dispatch(setCategoryList(categoryList));
    },
  });
  // console.log('useProductList  data:', data);

  const productList = data?.data?.data;

  return {
    productList,
    productListLod: isLoading,
    productListRefetch: refetch,
  };
}

export default useProductList;
