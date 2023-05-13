import { AppstoreAddOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useUserList from 'api-hooks/user/useUserList';
import DrawerUser from 'components/admin/Drawer/DrawerUser';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import Actions from './table-cells/Actions';

function Staff() {
  const [searchText, setSearchText] = useState<string>('');
  const [isDrawerUserOpen, setIsDrawerUserOpen] = useState(false);

  const { userList, userListLod } = useUserList();
  console.log('Staff  userList:', userList);

  // Remove admin
  const StaffList = userList?.filter((user: User) => user.name !== 'admin');

  const staffListFilterd = searchText
    ? StaffList?.filter((user: User) => {
        const searchFileds: (keyof User)[] = ['name', 'email', 'role'];
        // const searchFileds: (keyof typeof user)[] = ['name', 'email', 'role'];

        const userStr = JSON.stringify(
          searchFileds.map(filed => {
            // Solution 1: When the type of the object is known
            // return user[filed as keyof User];
            return user[filed];

            // Solution 2: When the type of the object is not known
            // return user[filed as keyof typeof user]
          })
        );
        console.log('Staff  userStr:', userStr);

        return userStr.includes(searchText);
      })
    : StaffList;

  const dataSource: StaffTableRecour[] = staffListFilterd?.map(
    (user: User): StaffTableRecour => {
      return {
        key: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
  );

  const columns: ColumnsType<StaffTableRecour> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: index => (
        <Highlighter
          searchWords={[searchText]}
          autoEscape
          textToHighlight={index}
        />
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: index => (
        <Highlighter
          searchWords={[searchText]}
          autoEscape
          textToHighlight={index}
        />
      ),
      // render: (role: string, record: StaffTableRecour) => (
      //   <Role role={role} record={record} searchText={searchText} />
      // ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record: StaffTableRecour) => <Actions record={record} />,
    },
  ];
  return (
    <div>
      <div className="h-16 px-4 flex items-center justify-end gap-4">
        <Button
          type="primary"
          size="large"
          className="flex items-center capitalize"
          icon={<UserAddOutlined />}
          onClick={() => setIsDrawerUserOpen(true)}
        >
          Add user
        </Button>
      </div>
      <div className="p-4 bg-slate-200 flex items-center gap-4">
        {/* <BtnBack /> */}
        <Input
          placeholder="Get user"
          // addonBefore="#"
          size="large"
          allowClear
          onChange={({ target }) => setSearchText(target.value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={userListLod}
        size="small"
        pagination={{ pageSize: 12, hideOnSinglePage: true }}
      />
      <DrawerUser open={isDrawerUserOpen} setOpen={setIsDrawerUserOpen} />
    </div>
  );
}

export default Staff;
