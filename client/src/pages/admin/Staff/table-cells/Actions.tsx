import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import useUserDelete from 'api-hooks/user/useUserDelete';
import DrawerUser from 'components/admin/Drawer/DrawerUser';
import { useState } from 'react';
import { useAppSelector } from 'services/store/configureStore';

interface ActionsProps {
  record: StaffTableRecour;
}
function Actions({ record }: ActionsProps) {
  const [isDrawerUserOpen, setIsDrawerUserOpen] = useState(false);

  const { userDelete, userDeleteLod } = useUserDelete();
  const { data } = useAppSelector(s => s.user);

  return (
    <>
      <div className="space-x-2">
        <Tooltip title="Edit user">
          <Button
            type="ghost"
            icon={<EditOutlined />}
            onClick={() => setIsDrawerUserOpen(true)}
          />
        </Tooltip>
        {record._id !== data?._id && (
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
        )}
      </div>
      <DrawerUser
        open={isDrawerUserOpen}
        setOpen={setIsDrawerUserOpen}
        editUser={record}
      />
    </>
  );
}

export default Actions;
