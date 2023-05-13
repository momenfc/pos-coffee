import { Button, Skeleton } from 'antd';
import { getDateFormat, getTimeFormat, priceFormat } from 'utils';
import { useAppDispatch, useAppSelector } from 'services/store/configureStore';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useMemo, useRef } from 'react';
import { generalDataUpdate } from 'services/store/reducers/generalData';
import { cx } from '@emotion/css';
import constants from 'consts';

function InvoiceCopy({
  order,
  loading,
  className,
  zoom = undefined,
}: {
  order?: OrderItem;
  loading?: boolean;
  className?: string;
  zoom?: undefined | boolean;
}) {
  const dispatch = useAppDispatch();
  const { lastOrder, isOrderToCopy } = useAppSelector(s => s.generalData);

  const currentOrder = useMemo(() => order || lastOrder, [order, lastOrder]);
  console.log('InvoiceCopy  currentOrder:', currentOrder);

  const orderRef = useRef(null);
  // const handlePrint =()=> useReactToPrint({
  //   content: () => orderRef.current,
  // });

  const handlePrint = useReactToPrint({
    // @ts-ignore
    content: () => orderRef.current,
    documentTitle: 'AwesomeFileName',
    removeAfterPrint: true,
  });

  useEffect(() => {
    console.log('useEffect  isOrderToCopy:', isOrderToCopy);
    if (isOrderToCopy && currentOrder) {
      handlePrint();
      dispatch(generalDataUpdate({ isOrderToCopy: false }));
    }
  }, [currentOrder, handlePrint, isOrderToCopy, dispatch]);

  if (!currentOrder) return <h1 className="text-red-400">No order to copy!</h1>;

  if (loading)
    return (
      <div className="w-[300px] p-3 flex flex-col items-center justify-center border rounded-md text-sm text-gray-700 capitalize">
        <Skeleton paragraph={{ rows: 8 }} active />
      </div>
    );
  return (
    // <div className="relative flex flex-col justify-center items-center">
    <div className="">
      {/* Invoice Start*/}
      <div
        ref={orderRef}
        className={cx(
          `w-[300px] p-3 flex flex-col items-center justify-center bg-white border rounded-md text-sm text-gray-600 tracking-tighter font-mono capitalize transition relative z-10`,
          { 'cursor-zoom-in': !zoom && zoom !== undefined },
          // {
          //   'cursor-zoom-out scale-150 absolute top-0 z-50':
          //     zoom && zoom !== undefined,
          // },
          {
            'cursor-zoom-out scale-150': zoom && zoom !== undefined,
          },
          className
        )}
      >
        <div className="self-end">copy</div>
        <div className="flex flex-col items-center -mt-4">
          <img src={constants.logo} alt="POS" className="w-16" />
          <span className="font-bold">{constants.branchName}</span>
        </div>

        <div className="w-full my-4 py-2 border-y border-dashed">
          <div>outlet: Dalla</div>
          <div className="flex justify-between">
            <span>date: {getDateFormat(currentOrder?.date)}</span>
            <span>time: {getTimeFormat(currentOrder?.date)}</span>
          </div>
          <div className="flex justify-between">
            <span>order type: In store</span>
            <span>serial: #{currentOrder?.orderNum}</span>
          </div>
          <div className="flex justify-between">
            <span>taken by: {currentOrder.takenBy}</span>
            {/* <span>serial: #{currentOrder?.orderNum}</span> */}
          </div>
        </div>

        <div className="w-full">
          {currentOrder?.items?.map(item => (
            <div key={item._id} className="flex justify-between">
              <span className="space-x-2">
                <span>{item.name}</span>
                <span>×{item.qty}</span>
              </span>
              <span>{priceFormat(item.price * item.qty)}</span>
            </div>
          ))}
        </div>

        <div className="w-full py-2 text-base font-bold">
          <div className="flex justify-between">
            <span>total</span>
            <span>{priceFormat(currentOrder?.total)}</span>
          </div>
        </div>
        <div className="w-full mt-3 text-xs text-gray-500">
          <div>payment recived, thank you.</div>
        </div>
      </div>
      {/* Invoice End*/}

      <Button
        type="primary"
        block
        className="mt-4"
        style={{ top: zoom ? 90 : 0 }}
        onClick={handlePrint}
      >
        Print
      </Button>
    </div>
  );
}

export default InvoiceCopy;
