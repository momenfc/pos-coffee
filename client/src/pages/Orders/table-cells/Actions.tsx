import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import useOrderDelete from 'api-hooks/order/useOrderDelete';

interface ActionsProps {
  record: OrderItem;
}
function Actions({ record }: ActionsProps) {
  const { orderDelete, orderDeleteLod } = useOrderDelete();

  return (
    <Popconfirm
      title="Are you sure?"
      onConfirm={() => orderDelete({ orderId: record._id })}
    >
      <Tooltip title="Delete order">
        <Button
          type="ghost"
          icon={<DeleteOutlined />}
          className="text-red-500"
          loading={orderDeleteLod}
        />
      </Tooltip>
    </Popconfirm>
  );
}

export default Actions;
