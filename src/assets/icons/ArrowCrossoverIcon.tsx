import type { SVGProps } from "react";

type CustomIconProps = {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

const ArrowCrossoverIcon = ({
  size = 14,
  color = "currentColor",
  ...props
}: CustomIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      width={size}
      height={size}
      {...props}
    >
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 0H9.5a0.5 0.5 0 0 0-0.354 0.854l1.293 1.292L0.293 12.293a1 1 0 1 0 1.414 1.414L11.854 3.561l1.292 1.293A0.5 0.5 0 0 0 14 4.5v-4a0.5 0.5 0 0 0-0.5-0.5H13ZM0.293 0.293a1 1 0 0 1 1.414 0l3.5 3.5a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414ZM14 9.5a0.5 0.5 0 0 0-0.854-0.354l-1.292 1.293-1.647-1.646a1 1 0 0 0-1.414 1.414l1.646 1.647-1.293 1.292A0.5 0.5 0 0 0 9.5 14h4a0.5 0.5 0 0 0 0.5-0.5v-4Z"
      />
    </svg>
  );
};

export default ArrowCrossoverIcon;