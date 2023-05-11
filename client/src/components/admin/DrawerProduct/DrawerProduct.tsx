import { Button, Drawer, Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import useProductAdd from 'api-hooks/product/useProductAdd';
import useProductEdit from 'api-hooks/product/useProductEdit';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'services/store/configureStore';

interface DrawerProductProps {
  editProduct?: Product;
  open: boolean;
  setOpen: (status?: any) => void;
}

function DrawerProduct({ editProduct, open, setOpen }: DrawerProductProps) {
  const categories = useAppSelector(s => s.category.list);
  const [categoryType, setCategoryType] = useState('');

  const [form] = Form.useForm();
  const { productAdd, productAddLod } = useProductAdd();
  const { productEdit, productEditLod } = useProductEdit();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  interface ProductData extends Product {
    otherCategory?: string;
  }
  const onFinish = (values: ProductData) => {
    console.log('onFinish  values:', values);
    const data = { ...values };

    if (data.otherCategory) {
      data.category = data.otherCategory;
    }

    if (editProduct) {
      productEdit({
        productId: editProduct._id,
        data,
        onSuc: onClose,
      });
    } else {
      productAdd({ data, onSuc: onClose });
    }
  };

  useEffect(() => {
    if (editProduct) {
      form.setFieldsValue(editProduct);
    }
  }, [editProduct, form]);
  return (
    <Drawer
      title={editProduct ? 'Edit product' : 'Add new product'}
      placement="top"
      closable={false}
      onClose={onClose}
      open={open}
    >
      <Form form={form} onFinish={onFinish} className="global-form">
        <div className="grid grid-cols-2 gap-4">
          <FormItem
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter product name',
              },
            ]}
          >
            <Input placeholder="Product name" className="global-input" />
          </FormItem>
          <FormItem
            name="price"
            rules={[
              {
                required: true,
                message: 'Please enter price',
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Product price"
              className="global-input"
            />
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormItem
            name="qtyType"
            className="flex-1"
            rules={[
              {
                required: true,
                message: 'Please select quantity type',
              },
            ]}
          >
            <Select
              placeholder="Quantity type"
              className="global-select"
              options={[
                {
                  value: 'piece',
                  label: 'piece',
                },
                {
                  value: 'weight',
                  label: 'weight',
                },
              ]}
            />
          </FormItem>
          <FormItem
            name="image"
            rules={[
              // {
              //   required: true,
              //   message: 'Please enter product image url',
              // },
              {
                type: 'url',
                message: 'Please enter valid image url',
              },
            ]}
          >
            <Input placeholder="Image url" className="global-input" />
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-2">
            <FormItem
              name="category"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: 'Please select product category',
                },
              ]}
            >
              <Select
                placeholder="Category"
                className="global-select"
                onChange={setCategoryType}
                options={categories
                  .map((c: string) => ({
                    value: c,
                    label: c,
                  }))
                  .concat({
                    value: 'other',
                    label: 'other',
                  })}
              />
            </FormItem>
            {categoryType === 'other' && (
              <FormItem
                className="flex-1"
                name="otherCategory"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product category name',
                  },
                ]}
              >
                <Input
                  placeholder="Other category name"
                  className="global-input"
                />
              </FormItem>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="primary"
            size="large"
            className="w-32 min-w-max"
            loading={productAddLod || productEditLod}
            htmlType="submit"
          >
            {editProduct ? 'Save changes' : 'Add'}
          </Button>
          <Button
            type="primary"
            ghost
            size="large"
            className="w-32 min-w-max"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}

export default DrawerProduct;
