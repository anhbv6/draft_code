import type { SVGProps } from "react";

type CustomIconProps = {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

const CartIcon = ({
  size = 24,
  color = "currentColor",
  ...props
}: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...props}
    >
      {/* bánh xe */}
      <circle cx="9" cy="21" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="19" cy="21" r="2" stroke={color} strokeWidth="1.5" />

      {/* thân giỏ */}
      <path
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l2 12h12l2-8H7"
      />
    </svg>
  );
};

export default CartIcon;