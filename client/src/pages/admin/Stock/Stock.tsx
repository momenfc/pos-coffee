// @ts-nocheck
import { EditOutlined, EditTwoTone } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from 'antd';
import useStock from 'api-hooks/stock/useStock';
import useStockUpdate from 'api-hooks/stock/useStockUpdate';
import React, { useEffect, useRef, useState, useContext } from 'react';
import Highlighter from 'react-highlight-words';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface DataType extends StockItem {
  key: React.Key;
}
function Stock() {
  const { stock, stockLod } = useStock();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataSourceOriginal, setDataSourceOriginal] = useState<DataType[]>([]);

  useEffect(() => {
    if (stock?.products) {
      const dataSource: DataType[] = stock?.products?.map((item: StockItem) => {
        return {
          key: item._id,
          _id: item._id,
          product: item,
          qtyType: item.qtyType,
          current: item.stockAvailable,
          newQuentity: item.stockAvailable,
        };
      });

      setDataSourceOriginal(dataSource);
      setDataSource(dataSource);
    }
  }, [stock?.products]);

  // const columns: ColumnsType<DataType> =
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (item: any) => (
        <div className="h-16 flex items-center gap-2">
          <img
            src={item?.image}
            alt={item.name}
            className="h-full w-16 object-cover"
          />
          <span className="font-semibold">{item.name}</span>
        </div>
      ),
    },
    {
      title: 'Quantity type',
      dataIndex: 'qtyType',
      key: 'qtyType',
    },
    {
      title: 'Current',
      dataIndex: 'current',
      key: 'current',
    },
    {
      title: 'New quentity',
      dataIndex: 'newQuentity',
      key: 'newQuentity',
      render: (newQty: number) => (
        <div className="space-x-1 cursor-pointer">
          <span>{newQty}</span>
          <EditTwoTone />
        </div>
      ),
      // render: (newQty: number) => <Input defaultValue={newQty} />,
      editable: true,
      //   sorter: (a, b) => a.total - b.total,
      //   sortDirections: ['descend'],
    },
  ];
  console.log('Stock  stock:', stock);

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  //
  const { stockUpdate, stockUpdateLod } = useStockUpdate();
  const onUpdate = () => {
    console.log(dataSource);
    const data = dataSource.map(item => ({
      id: item._id,
      stockAvailable: item.newQuentity,
    }));
    console.log(data);

    stockUpdate({ data });
  };
  return (
    <div>
      <Table
        components={components}
        columns={columns}
        dataSource={dataSource}
        loading={stockLod}
        size="small"
        // pagination={{ pageSize: Infinity }}
        pagination={false}
      />
      <div className="py-8 px-4 space-x-4 text-end">
        <Button
          type="primary"
          size="large"
          loading={stockUpdateLod}
          onClick={onUpdate}
        >
          Update
        </Button>
        <Popconfirm
          title={`Are you sure you want to cancel?`}
          onConfirm={() => {
            // console.log(dataSourceOriginal);
            setDataSource(dataSourceOriginal);
          }}
        >
          <Button type="primary" ghost size="large">
            Cancel
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default Stock;
