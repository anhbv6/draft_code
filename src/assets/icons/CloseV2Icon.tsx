import type { SVGProps } from "react";

type CustomIconProps = {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

const CloseV2Icon = ({
  size = 16,
  color = "currentColor",
  ...props
}: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      width={size}
      height={size}
      {...props}
    >
      <path
        d="M8 8 4.66667 4.66667m3.33333 3.33333 3.33333 3.33333m-3.33333-3.33333 3.33333-3.33333m-3.33333 3.33333-3.33333 3.33333"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3333"
      />
    </svg>
  );
};

export default CloseV2Icon;