import { Button, type ButtonProps } from "@chakra-ui/react";

interface AppButtonProps extends ButtonProps {}

const AppButton = ({ children, ...rest }: AppButtonProps) => {
  return <Button {...rest}>{children}</Button>;
};

export default AppButton;
