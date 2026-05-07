import type { SVGProps } from "react";

type CustomIconProps = {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

const ArrowRightIcon = ({
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
        d="M5 11h10.586l-4.293-4.293 1.414-1.414L19.414 12l-6.707 6.707-1.414-1.414L15.586 13H5z"
      />
    </svg>
  );
};

export default ArrowRightIcon;