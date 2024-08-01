import { clsx } from "clsx";
import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  className?: string;
};

type ButtonTextAndIconProps = {
  children: ReactNode;
};

function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx(
        "h-12 bg-lime-500 rounded-lg items-center justify-center flex-row",
        className,
      )}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: ButtonTextAndIconProps) {
  return <Text>{children}</Text>;
}

function ButtonIcon({ children }: ButtonTextAndIconProps) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
