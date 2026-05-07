import type { SVGProps } from "react";

type CustomIconProps = {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

const ArrowTopIcon = ({
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
      <path
        fill={color}
        d="M11 19V8.414l-4.293 4.293-1.414-1.414L12 4.586l6.707 6.707-1.414 1.414L13 8.414V19z"
      />
    </svg>
  );
};

export default ArrowTopIcon;