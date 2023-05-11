import { useAppDispatch } from 'services/store/configureStore';
import { deleteCartItem } from 'services/store/reducers/cart';
import { priceFormat } from 'utils';

function CartItem({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();

  const onDeleteCartItem = () => {
    dispatch(deleteCartItem({ _id: item._id }));
  };

  return (
    <div
      className="h-16 flex gap-2 bg-slate-100 transition hover:bg-slate-200 cursor-pointer"
      onClick={onDeleteCartItem}
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-16 object-cover"
      />
      <div className="flex flex-col justify-center">
        <div className="font-medium">{item.name}</div>
        <div className="flex gap-4">
          <div>{priceFormat(item.price)} LE</div>
          <div className="font-bold">×{item.qty}</div>
          <div>{priceFormat(item.price * item.qty)} LE</div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
