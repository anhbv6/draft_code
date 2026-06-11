export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
};

export type CartItem = Product & {
  quantity: number;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 1299000,
    image: "🎧",
    category: "Âm thanh",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Mechanical Keyboard RGB",
    price: 2450000,
    image: "⌨️",
    category: "Phụ kiện",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Ultra HD Webcam 4K",
    price: 3200000,
    image: "📷",
    category: "Camera",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Ergonomic Mouse X1",
    price: 890000,
    image: "🖱️",
    category: "Phụ kiện",
    rating: 4.5,
  },
  {
    id: 5,
    name: "USB-C Hub 7-in-1",
    price: 750000,
    image: "🔌",
    category: "Phụ kiện",
    rating: 4.3,
  },
  {
    id: 6,
    name: "Portable SSD 1TB",
    price: 2890000,
    image: "💾",
    category: "Lưu trữ",
    rating: 4.7,
  },
];

export const MOCK_CART: CartItem[] = [
  { ...MOCK_PRODUCTS[0], quantity: 1 },
  { ...MOCK_PRODUCTS[1], quantity: 2 },
  { ...MOCK_PRODUCTS[3], quantity: 1 },
];
