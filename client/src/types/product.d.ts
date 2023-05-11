interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  qtyType: 'piece' | 'weight';
  image: string;
  stockAvailable: number;
}
