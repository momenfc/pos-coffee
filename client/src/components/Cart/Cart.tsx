import { Button, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'services/store/configureStore';
import { priceFormat } from 'utils';
import CartItem from './CartItem';
const { Sider } = Layout;

function Cart() {
  const navigate = useNavigate();
  const { items, total } = useAppSelector(s => s.cart);



  return (
    <Sider
      className="bg-slate-50"
      style={{ background: 'rgb(248 250 252)' }}
      width={320}
    >
      <div className="h-screen relative">
        <div className="h-16 py-2 px-4 flex items-center justify-between  border-b border-slate-400">
          <div className="font-bold">Cart items ({items.length})</div>
          <Button
            type="primary"
            className="h-12"
            disabled={!items.length}
            onClick={() => navigate('/checkout')}
          >
            checkout
          </Button>
        </div>
        <div className="py-2 h-[calc(100%-135px)] overflow-y-auto space-y-2">
          {items.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
        <div className="h-[70px] sticky t-full border-t  border-slate-400">
          <div className="p-4 flex justify-between items-center font-bold uppercase">
            <span>total:</span>
            <span>{priceFormat(total)} LE</span>
          </div>
        </div>
      </div>
    </Sider>
  );
}

export default Cart;
