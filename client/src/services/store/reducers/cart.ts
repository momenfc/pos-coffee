import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
  total: 0,
};

const collectTotal = (items: CartItem[]) =>
  items.reduce((a, c) => a + c.price * c.qty, 0);

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { _id, qty = 1 } = action.payload;
      const currentItem = state.items.find(item => item._id === _id);

      if (currentItem) {
        currentItem.qty = currentItem.qty + qty;
        state.items = state.items.map(item =>
          item._id === _id ? currentItem : item
        );
      } else {
        const item = action.payload;
        item.qty = qty;
        state.items.push(item);
      }

      state.total = collectTotal(state.items);
    },
    deleteCartItem: (state, action: PayloadAction<{ _id: string }>) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );
      const item = state.items[itemIndex];

      if (item.qty && item.qty > 1 && item.qtyType === 'piece') {
        item.qty = item.qty - 1;
        state.items[itemIndex] = item;
      } else {
        state.items.splice(itemIndex, 1);
      }

      state.total = collectTotal(state.items);
    },
    clearCartItems: (state, action: PayloadAction) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, deleteCartItem, clearCartItems } = slice.actions;

export default slice.reducer;
