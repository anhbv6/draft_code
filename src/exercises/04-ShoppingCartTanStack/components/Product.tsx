import React from 'react'
import type { Product } from '../mockData'
import { Plus, Tag } from 'lucide-react'
import { formatVND } from '../../../constants/common';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= Math.round(rating)} />
      ))}
      <span className="ml-1 text-[11px] text-text-muted">{rating}</span>
    </div>
  );
}

type ProductProps = {
    product: Product
}

const Product = ({
    product,
} : ProductProps) => {
    return (
        <div className="group flex flex-col rounded-2xl bg-surface p-4 transition-all duration-300 hover:bg-surface-light hover:shadow-lg hover:shadow-primary/5">
            {/* Image / Emoji */}
            <div className="mb-3 flex h-28 items-center justify-center rounded-xl bg-surface-lighter/50 text-5xl transition-transform duration-300 group-hover:scale-105">
                {product.image}
            </div>

            {/* Category badge */}
            <div className="mb-2 flex items-center gap-1">
                <Tag />
                <span className="text-[11px] font-medium text-text-muted">{product.category}</span>
            </div>

            {/* Name */}
            <h3 className="mb-1 text-sm font-semibold text-text leading-snug line-clamp-2 min-h-[2.5rem]">
                {product.name}
            </h3>

            {/* Rating */}
            <div className="mb-3">
                <StarRating rating={product.rating} />
            </div>

            {/* Price + Add */}
            <div className="mt-auto flex items-center justify-between">
                <span className="text-sm font-bold text-accent-light">{formatVND(product.price)}</span>
                <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-md hover:shadow-primary/25 cursor-pointer">
                <Plus />
                <span>Thêm</span>
                </button>
            </div>
        </div>
    )
}

export default Product