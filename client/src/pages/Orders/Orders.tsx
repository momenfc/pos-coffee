import { Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useOrderList from 'api-hooks/order/useOrderList';
import BtnBack from 'components/buttons/BtnBack';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { getDateFormat, getTimeFormat, priceFormat } from 'utils';
import Actions from './table-cells/Actions';

function Orders() {
  const [searchText, setSearchText] = useState<string>('');

  const { orderList, orderListLod } = useOrderList();
  console.log('Orders  orderList:', orderList);

  interface DataType extends OrderItem {
    key: React.Key;
  }

  const orderListFilterd = searchText
    ? orderList?.filter((order: OrderItem) =>
        order.orderNum.toString().includes(searchText)
      )
    : orderList;

  const dataSource: DataType[] = orderListFilterd?.map((order: OrderItem) => {
    return {
      key: order._id,
      _id: order._id,
      orderNum: order.orderNum,
      date: getDateFormat(order.date),
      time: getTimeFormat(order.date),
      takenBy: order.takenBy,
      total: priceFormat(order.total),
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Order',
      dataIndex: 'orderNum',
      key: 'orderNum',
      render: (orderNum: number, record: DataType) => (
        <Link to={record._id} className="px-3 py-1 bg-slate-100 rounded">
          <Highlighter
            searchWords={[searchText]}
            autoEscape
            textToHighlight={`#${orderNum}`}
          />
        </Link>
      ),
      sorter: (a, b) => a.orderNum - b.orderNum,
      sortDirections: ['descend'],
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Taken by',
      dataIndex: 'takenBy',
      key: 'takenBy',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      sorter: (a, b) => a.total - b.total,
      sortDirections: ['descend'],
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record: DataType) => <Actions record={record} />,
    },
  ];
  return (
    <div>
      <div className="p-4 bg-slate-200 flex items-center gap-4">
        {/* <BtnBack /> */}
        <Input
          placeholder="Get order"
          addonBefore="#"
          size="large"
          allowClear
          onChange={({ target }) => setSearchText(target.value)}
        />
      </div>
      <div className="order-wrapper">
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={orderListLod}
          size="small"
          pagination={{ pageSize: 12 }}
        />
      </div>
    </div>
  );
}

export default Orders;
