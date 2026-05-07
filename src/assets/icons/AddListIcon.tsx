import type { SVGProps } from "react";

type CustomIconProps = {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

const AddListIcon = ({
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
        d="M18.5 16.5H22v2h-3.5V22h-2v-3.5H13v-2h3.5V13h2zM3.5 14c0.82843 0 1.5 0.6716 1.5 1.5S4.32843 17 3.5 17 2 16.3284 2 15.5 2.67157 14 3.5 14m7.5 2.5H7v-2h4zM3.5 8C4.32843 8 5 8.67157 5 9.5c0 0.8284 -0.67157 1.5 -1.5 1.5S2 10.3284 2 9.5C2 8.67157 2.67157 8 3.5 8M20 10.5H7v-2h13zM3.5 2C4.32843 2 5 2.67157 5 3.5S4.32843 5 3.5 5 2 4.32843 2 3.5 2.67157 2 3.5 2M20 4.5H7v-2h13z"
      />
    </svg>
  );
};

export default AddListIcon;