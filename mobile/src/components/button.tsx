import { clsx } from "clsx";
import { ReactNode } from "react";
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  className?: string;
};

type ButtonTextProps = TextProps & {
  children: ReactNode;
};

type ButtonIconProps = {
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

function ButtonText({ children, ...rest }: ButtonTextProps) {
  return <Text {...rest}>{children}</Text>;
}

function ButtonIcon({ children }: ButtonIconProps) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
