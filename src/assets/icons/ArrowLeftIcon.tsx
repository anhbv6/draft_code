import type { SVGProps } from "react";

type CustomIconProps = {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

const ArrowLeftIcon = ({
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
        d="M19 11H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707 1.414-1.414L8.414 13H19z"
      />
    </svg>
  );
};

export default ArrowLeftIcon;