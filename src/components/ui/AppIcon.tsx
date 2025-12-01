import { Icon, type IconProps } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface AppIconProps extends IconProps {
  icon: IconType; // Accept any react-icons component
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit"; // Chakra sizes
}

const AppIcon: React.FC<AppIconProps> = ({ icon, size, ...rest }) => {
  return <Icon as={icon} size={size} {...rest} />;
};

export default AppIcon;
