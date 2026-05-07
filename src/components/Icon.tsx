import { ICONS } from "../constants/icons";
import type { SVGProps } from "react";

type IconProps = {
  name: keyof typeof ICONS;
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>; // Kế thừa onClick, className, style, aria-*

const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  ...props
}: IconProps) => {
  const Component = ICONS[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <Component 
          size={size}
          color={color}
          {...props} 
        />;
};

export default Icon;