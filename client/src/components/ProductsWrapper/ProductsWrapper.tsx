import { Col, Row } from 'antd';
import useProductList from 'api-hooks/product/useProductList';
import ProductCard from 'components/cards/ProductCard';
import Categories from './Categories';
import { useState } from 'react';
import { crtArr } from 'utils';

interface ProductsWrapperProps {
  editMood?: boolean;
}
function ProductsWrapper({ editMood }: ProductsWrapperProps) {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const {
    productList,
    productListLod,
  }: { productList: Product[]; productListLod: boolean } = useProductList();
  // console.log('Home  productList:', productList);
  const productListFilterd =
    currentCategory === 'all'
      ? productList
      : productList.filter(p => p.category === currentCategory);
  return (
    <div className="">
      <Categories
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <div className="py-6">
        <Row gutter={[15, 15]} justify="center">
          {productListLod
            ? crtArr(9).map((_, i) => (
                <Col key={i}>
                  <ProductCard loading />
                </Col>
              ))
            : productListFilterd?.map((product: Product) => (
                <Col key={product._id}>
                  <ProductCard product={product} editMood={editMood} />
                </Col>
              ))}
        </Row>
      </div>
    </div>
  );
}

export default ProductsWrapper;
