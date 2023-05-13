import { Button } from 'antd';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { priceFormat } from 'utils';

function OrdersSummary() {
  const { state } = useLocation();
  const orderRef = useRef(null);
  console.log('OrdersSummary  state:', state);

  interface ProductItem
    extends Omit<CartItem, 'category' | 'image' | 'stockAvailable'> {
    total: number;
  }

  interface OrderItemsProduct extends Omit<OrderItem, 'items'> {
    items: ProductItem[];
  }
  const productList: ProductItem[] = state.orderList.reduce(
    (a: ProductItem[], c: OrderItemsProduct) => {
      c.items.forEach(item => {
        let isCurrent = false;
        const itemCopy = { ...item };
        itemCopy.total = item.price * item.qty;
        a.forEach(product => {
          if (product._id === itemCopy._id) {
            isCurrent = true;
            product.qty += itemCopy.qty;
            product.total += itemCopy.total;
          }
        });

        if (!isCurrent) {
          a.push(itemCopy);
        }
      });

      return a;
    },
    []
  );

  //   console.log('OrdersSummary  productList:', productList);
  const totalPrice = productList.reduce((a, c) => a + c.total, 0);
  const handlePrint = useReactToPrint({
    // @ts-ignore
    content: () => orderRef.current,
    documentTitle: 'AwesomeFileName',
    removeAfterPrint: true,
  });
  return (
    <div>
      <div className="p-4 flex justify-between items-center">
        <h1 className="title">{`Summary for ${state?.filterByText} orders`}</h1>
        <Button
          type="primary"
          // block
          className="mt-4"
          // style={{ top: zoom ? 90 : 0 }}
          onClick={handlePrint}
        >
          Print
        </Button>
      </div>
      <div className="p-4 text-gray-600" ref={orderRef}>
        <div className="grid grid-cols-4 gap-4 border-b py-2 mb-4 font-semibold">
          <h4>Product name</h4>
          <h4>Quantity</h4>
          <h4>Type</h4>
          <h4>Total</h4>
        </div>
        {productList.map((product: ProductItem) => (
          <div className="grid grid-cols-4 gap-4 mb-4">
            <span>{product.name}</span>
            <span>{product.qty}</span>
            <span>{product.qtyType}</span>
            <span>{product.total}</span>
          </div>
        ))}
        <p className="p-4 mt-8 w-max border-t-2 text-2xl text-end font-semibold">
          Total: {priceFormat(totalPrice, '$')}
        </p>
      </div>
    </div>
  );
}

export default OrdersSummary;
