import { Button, Input, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useOrderList from 'api-hooks/order/useOrderList';
import dayjs from 'dayjs';
import useSearchQuery from 'hooks/useSearchQuery';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getDateFormat, getTimeFormat, priceFormat } from 'utils';
import Actions from './table-cells/Actions';

function Orders() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log('Orders  state:', state);
  const [searchText, setSearchText] = useState<string>('');
  const { searchQueryObj, setSearchQuery } = useSearchQuery();
  const { orderList, orderListLod } = useOrderList();
  // const [filterBy, setFilterBy] = useState('all');
  const [filterByText, setFilterByText] = useState('all');
  // console.log('Orders  orderList:', orderList);

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
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record: DataType) => <Actions record={record} />,
    },
  ];

  const onFilter = (value: any) => {
    // console.log('onFilter  value:', value);
    // setFilterBy(value);
    const queryObj = { ...searchQueryObj };
    switch (value) {
      case 'today': {
        const start = dayjs().startOf('day').toISOString();
        const end = dayjs().endOf('day').toISOString();
        queryObj['date[gte]'] = start;
        queryObj['date[lte]'] = end;
        const text = `today (${getDateFormat(start)})`;
        setFilterByText(text);
        break;
      }

      case 'yesterday': {
        const start = dayjs().subtract(1, 'day').startOf('day').toISOString();
        const end = dayjs().subtract(1, 'day').endOf('day').toISOString();
        queryObj['date[gte]'] = start;
        queryObj['date[lte]'] = end;
        const text = `yesterday (${getDateFormat(start)})`;
        setFilterByText(text);
        break;
      }
      case 'this month': {
        const start = dayjs().startOf('month').toISOString();
        const end = dayjs().endOf('month').toISOString();
        queryObj['date[gte]'] = start;
        queryObj['date[lte]'] = end;
        const text = `this month (${dayjs().month(1).format('YYYY/MM')})`;
        setFilterByText(text);
        break;
      }

      default:
        Object.keys(queryObj).forEach(key => {
          if (key.startsWith('date')) delete queryObj[key];
        });
        setFilterByText('all');
    }

    setSearchQuery(queryObj, { state: { filterBy: value } });
    return {};
  };
  return (
    <div>
      <div className="p-4 bg-slate-200 flex items-center gap-3">
        {/* <BtnBack /> */}
        <Input
          placeholder="Get order"
          addonBefore="#"
          size="large"
          allowClear
          onChange={({ target }) => setSearchText(target.value)}
        />
        <Select
          size="large"
          className="w-60 capitalize"
          placeholder="Filter by"
          defaultValue={state?.filterBy}
          options={['all', 'today', 'yesterday', 'this month'].map(e => ({
            value: e,
            lable: e,
          }))}
          onChange={onFilter}
        />
        <Button
          type="primary"
          size="large"
          onClick={() =>
            navigate('/dashboard/orders-summary', {
              state: {
                orderList: orderListFilterd,
                filterByText,
              },
            })
          }
        >
          Show summary
        </Button>
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

// 2023-05-12T16:20:32.055Z
// 2023-05-12T18:49:52.529Z
