import type { SVGProps } from "react";

type CustomIconProps = {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

const MenuIcon = ({
  size = 48,
  color = "currentColor",
  ...props
}: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      {...props}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="4.5"
        d="M3.42 11.2595h41.16"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="4.5"
        d="M3.42 24.0003h41.16"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="4.5"
        d="M3.42 36.7405h41.16"
      />
    </svg>
  );
};

export default MenuIcon;