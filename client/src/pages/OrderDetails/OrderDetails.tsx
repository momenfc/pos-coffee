import useOrderDetails from 'api-hooks/order/useOrderDetails';
import BtnBack from 'components/buttons/BtnBack';
import InvoiceCopy from 'components/InvoiceCopy/InvoiceCopy';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const { orderId } = useParams();
  const [isZoom, setIsZoom] = useState(false);
  // console.log('OrderDetails  orderId:', orderId);
  const { orderDetails, orderDetailsLod } = useOrderDetails(orderId);
  // console.log('OrderDetails  orderDetails:', orderDetails);

  return (
    <div className="">
      {/* <div className="px-4 py-2 bg-slate-100">
        <BtnBack />
      </div> */}
      <div
        className="mt-28 flex justify-center cursor-pointer"
        onClick={() => setIsZoom(!isZoom)}
      >
        <InvoiceCopy
          order={orderDetails}
          loading={orderDetailsLod}
          zoom={isZoom}
        />
      </div>
    </div>
  );
}

export default OrderDetails;
