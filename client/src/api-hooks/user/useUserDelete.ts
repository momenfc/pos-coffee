import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useUserDelete() {
  const api = useApi();
  const client = useQueryClient();

  const http = async ({
    userId,
    onSuc,
  }: {
    userId: string;
    onSuc?: (res: any) => void;
  }) => {
    const res = await api.delete(`/users/${userId}`);
    if (res.status === 'succes') {
      onSuc && onSuc(res);
    }
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSettled: () => {
      client.invalidateQueries([queryKeys.userList]);
    },
  });

  return {
    userDelete: mutate,
    userDeleteLod: isLoading,
  };
}

export default useUserDelete;
