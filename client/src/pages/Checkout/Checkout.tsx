import { Button, InputNumber } from 'antd';
import useOrderAdd from 'api-hooks/order/useOrderAdd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/store/configureStore';
import { clearCartItems } from 'services/store/reducers/cart';
import { priceFormat } from 'utils';
import { generalDataUpdate } from 'services/store/reducers/generalData';
import BtnBack from 'components/buttons/BtnBack';

function Checkout() {
  const navigate = useNavigate();
  const { items, total } = useAppSelector(s => s.cart);
  const dispatch = useAppDispatch();
  const { orderAdd, orderAddLod } = useOrderAdd();

  const [amoutPaid, setAmoutPaid] = useState<number | null>(null);

  const onCompleteCheckout = () => {
    console.log('Checkout  items:', items);
    if (!items.length) return navigate('/');
    const itemsData = items.map(item => ({ id: item._id, qty: item.qty }));
    const data = {
      items: itemsData,
    };
    console.log('onCompleteCheckout  data:', data);
    orderAdd({
      data,
      onSuc: res => {
        console.log('orderAdd  res:', res);
        setAmoutPaid(null);
        dispatch(clearCartItems());
        dispatch(generalDataUpdate({ lastOrder: res?.data?.data }));
        console.log('onCompleteCheckout  res?.data?.data :', res?.data?.data);
        // handlePrint();
        navigate('/');
      },
    });
  };

  return (
    <main>
      <div className="px-4 py-2 bg-slate-100">
        <BtnBack />
      </div>

      <div className="w-2/3 m-auto mt-20 flex flex-col gap-4 text-lg font-medium capitalize truncate space-y-2 border p-10 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 items-center gap-2">
          <span className="">Deserved amount:</span>
          <span className="font-bold font-mono">{priceFormat(total)} LE</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="">Amount paid:</div>
          <InputNumber
            placeholder="Amount paid"
            size="large"
            prefix="LE"
            autoFocus
            className="w-36 flex-row-reverse pe-2 font-bold font-mono"
            value={amoutPaid}
            onChange={value => value && setAmoutPaid(value)}
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div>Remaining amount:</div>
          <div className="font-bold font-mono text-green-500">
            {amoutPaid && amoutPaid >= total
              ? priceFormat(amoutPaid - total)
              : '_'}{' '}
            LE
          </div>
        </div>

        <Button
          type="primary"
          block
          size="large"
          className="!h-12 !mt-6 tracking-wider"
          disabled={!(amoutPaid && amoutPaid >= total)}
          loading={orderAddLod}
          onClick={onCompleteCheckout}
        >
          Complete checkout
        </Button>
      </div>
    </main>
  );
}

export default Checkout;
