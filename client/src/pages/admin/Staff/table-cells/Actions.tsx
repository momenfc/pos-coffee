import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import useUserDelete from 'api-hooks/user/useUserDelete';

interface ActionsProps {
  record: StaffTableRecour;
}
function Actions({ record }: ActionsProps) {
  const { userDelete, userDeleteLod } = useUserDelete();

  if (record.role === 'admin') return <></>;
  return (
    <Popconfirm
      title="Are you sure?"
      onConfirm={() => userDelete({ userId: record._id })}
    >
      <Tooltip title="Delete user">
        <Button
          type="ghost"
          icon={<DeleteOutlined />}
          className="text-red-500"
          loading={userDeleteLod}
        />
      </Tooltip>
    </Popconfirm>
  );
}

export default Actions;
