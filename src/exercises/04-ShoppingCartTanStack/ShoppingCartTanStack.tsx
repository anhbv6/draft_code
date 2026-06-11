import "./shoppingcart.css";
import {
  MOCK_PRODUCTS,
  MOCK_CART,
  type CartItem,
} from "./mockData";
import { Plus } from "lucide-react";
import Item from "./components/Item";
import Product from "./components/Product";

/* ────────── Format tiền VNĐ ────────── */
const formatVND = (n: number) =>
  n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

/* ────────── SVG Icons ────────── */
const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);
const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
);


/* ────────── Main Component ────────── */
export default function ShoppingCartTanStack() {
  const products = MOCK_PRODUCTS;
  const cart = MOCK_CART;

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 30000;
  const total = subtotal + shipping;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="flex h-full bg-bg overflow-hidden font-sans">
      {/* ═══════ LEFT: Product List ═══════ */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-primary-light mb-1">
            <BagIcon />
            <span className="text-xs font-semibold uppercase tracking-widest">TanStack Query</span>
          </div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-text tracking-tight">Cửa hàng</h1>
            <span className="flex gap-1 items-center text-white cursor-pointer text-sm">
              <Plus size={16}/>
              Add more
            </span>
          </div>
          <p className="mt-1 text-sm text-text-muted">Khám phá sản phẩm công nghệ mới nhất 🚀</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <Product key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* ═══════ RIGHT: Cart Sidebar ═══════ */}
      <aside className="flex w-[400px] shrink-0 flex-col border-l border-surface-lighter/50 bg-surface/50">
        {/* Cart header */}
        <div className="flex items-center justify-between border-b border-surface-lighter/50 px-5 py-4">
          <div className="flex items-center gap-2">
            <CartIcon />
            <h2 className="text-lg font-bold text-text">Giỏ hàng</h2>
          </div>
          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {totalItems}
          </span>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-sm text-text-muted">Giỏ hàng trống</p>
              <p className="text-xs text-text-muted/60 mt-1">Thêm sản phẩm để bắt đầu mua sắm!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {cart.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Cart summary */}
        <div className="border-t border-surface-lighter/50 px-5 py-4 space-y-3">
          {/* Coupon input */}
          <div className="flex gap-2">
            <input
              placeholder="Mã giảm giá..."
              className="flex-1 rounded-lg border border-surface-lighter bg-surface px-3 py-2 text-xs text-text placeholder-text-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
            <button className="rounded-lg bg-surface-lighter px-3 py-2 text-xs font-semibold text-text-muted transition-colors hover:bg-primary/20 hover:text-primary-light cursor-pointer">
              Áp dụng
            </button>
          </div>

          {/* Price breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-text-muted">
              <span>Tạm tính</span>
              <span className="text-text">{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Phí vận chuyển</span>
              <span className="text-text">{formatVND(shipping)}</span>
            </div>
            <div className="h-px bg-surface-lighter/50" />
            <div className="flex justify-between font-bold">
              <span className="text-text">Tổng cộng</span>
              <span className="text-lg text-accent-light">{formatVND(total)}</span>
            </div>
          </div>

          {/* Checkout button */}
          <button className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-light py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:brightness-110 cursor-pointer">
            Thanh toán ({totalItems} sản phẩm)
          </button>

          <p className="text-center text-[11px] text-text-muted/50">
            Miễn phí vận chuyển cho đơn trên 500.000₫
          </p>
        </div>
      </aside>
    </div>
  );
}