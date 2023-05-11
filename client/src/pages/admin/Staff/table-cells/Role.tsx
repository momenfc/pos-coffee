import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import useUserRoleChange from 'api-hooks/user/useUserRoleChange';
import Highlighter from 'react-highlight-words';

interface RoleProps {
  role: string;
  record: StaffTableRecour;
  searchText: string;
}
function Role({ role, record, searchText }: RoleProps) {
  const { userRoleChange, userRoleChangeLod } = useUserRoleChange();

  if (role === 'lead') {
    return (
      <div className="space-x-2">
        <Highlighter
          searchWords={[searchText]}
          autoEscape
          textToHighlight={role}
        />
        <Tooltip title="Change role to user">
          <Button
            type="primary"
            ghost
            size="small"
            icon={<CaretDownOutlined className="text-red-400" />}
            className="inline-flex items-center justify-center"
            loading={userRoleChangeLod}
            onClick={() =>
              userRoleChange({ data: { userId: record._id, role: 'user' } })
            }
          />
        </Tooltip>
      </div>
    );
  } else if (role === 'user') {
    return (
      <div className="space-x-2">
        <Highlighter
          searchWords={[searchText]}
          autoEscape
          textToHighlight={role}
        />
        <Tooltip title="Change role to lead">
          <Button
            type="primary"
            ghost
            size="small"
            icon={<CaretUpOutlined className="text-green-400" />}
            className="inline-flex items-center justify-center"
            loading={userRoleChangeLod}
            onClick={() =>
              userRoleChange({ data: { userId: record._id, role: 'lead' } })
            }
          />
        </Tooltip>
      </div>
    );
  }

  return (
    <Highlighter searchWords={[searchText]} autoEscape textToHighlight={role} />
  );
}

export default Role;
