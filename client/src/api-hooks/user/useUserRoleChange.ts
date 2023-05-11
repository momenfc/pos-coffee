import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from 'hooks/useApi';
import { queryKeys } from 'services/react-query/queryKeys';

function useUserRoleChange() {
  const api = useApi();
  const client = useQueryClient();

  const http = async ({
    data,
    onSuc,
  }: {
    data: { userId: string; role: string };
    onSuc?: (res: any) => void;
  }) => {
    const res = await api.patch(`/users/role-update`, data);
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
    userRoleChange: mutate,
    userRoleChangeLod: isLoading,
  };
}

export default useUserRoleChange;
