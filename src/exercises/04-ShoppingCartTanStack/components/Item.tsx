import React from 'react'
import type { CartItem } from '../mockData'
import { Minus, Plus, Trash } from 'lucide-react'
import { formatVND } from '../../../constants/common'

type ItemProps = {
  item: CartItem
}

const Item = ({
  item,
} : ItemProps) => {
  return (
    <div className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-surface-lighter/40">
      {/* Emoji thumbnail */}
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-surface-lighter/60 text-2xl">
        {item.image}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text truncate">{item.name}</p>
        <p className="text-xs text-accent-light font-semibold">{formatVND(item.price)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center">
        <button className="flex size-7 items-center justify-center rounded-md bg-surface-lighter text-text-muted transition-colors hover:bg-primary/20 hover:text-primary-light cursor-pointer">
          <Minus />
        </button>
        <span className="w-7 text-center text-sm font-bold text-text">{item.quantity}</span>
        <button className="flex size-7 items-center justify-center rounded-md bg-surface-lighter text-text-muted transition-colors hover:bg-primary/20 hover:text-primary-light cursor-pointer">
          <Plus />
        </button>
      </div>

      {/* Subtotal */}
      <span className="w-7 text-right text-xs font-semibold text-text">
        {formatVND(item.price * item.quantity)}
      </span>

      {/* Delete */}
      <button className="rounded-lg p-1.5 text-text-muted opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-danger/20 hover:text-danger cursor-pointer">
        <Trash />
      </button>
    </div>
  )
}

export default Item