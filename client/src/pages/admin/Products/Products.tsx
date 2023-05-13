import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import DrawerProduct from 'components/admin/Drawer/DrawerProduct';
import ProductsWrapper from 'components/ProductsWrapper/ProductsWrapper';
import { useState } from 'react';

function Products() {
  const [isDrawerProductOpen, setIsDrawerProductOpen] = useState(false);
  return (
    <div>
      <div className="h-16 px-4 flex items-center justify-end gap-4">
        <Button
          type="primary"
          size="large"
          className="flex items-center capitalize"
          icon={<AppstoreAddOutlined />}
          onClick={() => setIsDrawerProductOpen(true)}
        >
          Add product
        </Button>
      </div>
      <ProductsWrapper editMood />
      <DrawerProduct
        open={isDrawerProductOpen}
        setOpen={setIsDrawerProductOpen}
      />
    </div>
  );
}

export default Products;
