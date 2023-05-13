import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useUserEdit() {
  const api = useApi();
  const client = useQueryClient();

  const http = async ({
    userId,
    data,
    onSuc,
  }: {
    userId: string;
    data: object;
    onSuc?: (res: any) => void;
  }) => {
    const res = await api.patch(`/users/${userId}`, data);
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
    userEdit: mutate,
    userEditLod: isLoading,
  };
}

export default useUserEdit;
