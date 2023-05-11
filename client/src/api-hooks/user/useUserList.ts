import { useQuery } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useUserList() {
  const api = useApi();

  const http = async () => {
    const res = await api.get(`/users`);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.userList], http, {
    onSuccess: undefined,
  });
  // console.log('useUserList  data:', data);

  const userList = data?.data?.data;

  return {
    userList,
    userListLod: isLoading,
  };
}

export default useUserList;
