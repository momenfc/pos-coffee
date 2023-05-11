interface CartItem extends Product {
  qty: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}
