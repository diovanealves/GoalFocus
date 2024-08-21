import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import { Text, TextProps, View, ViewProps } from "react-native";
import { MaskService } from "react-native-masked-text";

type CardProps = ViewProps & {};

type CardTextProps = TextProps & {};

type CardTextCurrencyProps = TextProps & {
  value: string;
};

type CardIconProps = ViewProps & {
  type: "INCOME" | "EXPENSE";
  size?: number;
  color?: string;
};

type CardProgressProps = ViewProps & {
  currentValue: string;
  finalValue: string;
};

type CardTextProgressProps = TextProps & {
  currentValue: string;
  finalValue: string;
};

function Card({ children, ...rest }: CardProps) {
  return <View {...rest}>{children}</View>;
}

function CardText({ children, ...rest }: CardTextProps) {
  return <Text {...rest}>{children}</Text>;
}

function CardTextCurrency({ value, ...rest }: CardTextCurrencyProps) {
  const numericValue = parseFloat(value).toFixed(2);
  var moneyMask = MaskService.toMask("money", numericValue, {
    unit: "R$ ",
    separator: ",",
    delimiter: ".",
  }).toString();

  return <Text {...rest}>{moneyMask}</Text>;
}

function CardIcon({
  type,
  size = 24,
  color = "#FFFFFF",
  ...rest
}: CardIconProps) {
  return (
    <Feather
      name={type === "INCOME" ? "trending-up" : "trending-down"}
      size={size}
      color={color}
      {...rest}
    />
  );
}

function CardProgress({
  currentValue,
  finalValue,
  children,
  ...rest
}: CardProgressProps) {
  const progressPercentage =
    (parseInt(currentValue) / parseInt(finalValue)) * 100 || 0;

  return (
    <View
      className="w-full h-7 bg-zinc-500 rounded-lg flex justify-center"
      {...rest}
    >
      {children}
      <View
        className={clsx(
          "h-full bg-lime-500 rounded-lg",
          progressPercentage === 0 && "w-[0%]",
          progressPercentage > 0 && progressPercentage <= 10 && "w-[10%]",
          progressPercentage > 10 && progressPercentage <= 20 && "w-[20%]",
          progressPercentage > 20 && progressPercentage <= 30 && "w-[30%]",
          progressPercentage > 30 && progressPercentage <= 40 && "w-[40%]",
          progressPercentage > 40 && progressPercentage <= 50 && "w-[50%]",
          progressPercentage > 50 && progressPercentage <= 60 && "w-[60%]",
          progressPercentage > 60 && progressPercentage <= 70 && "w-[70%]",
          progressPercentage > 70 && progressPercentage <= 80 && "w-[80%]",
          progressPercentage > 80 && progressPercentage <= 90 && "w-[90%]",
          progressPercentage > 90 && progressPercentage <= 100 && "w-[100%]",
        )}
      />
    </View>
  );
}

function CardProgressText({
  currentValue,
  finalValue,
  children,
  ...rest
}: CardTextProgressProps) {
  const progressPercentage =
    (parseInt(currentValue) / parseInt(finalValue)) * 100 || 0;

  return <Text {...rest}>{progressPercentage.toFixed(2)}%</Text>;
}

Card.Text = CardText;
Card.TextCurrency = CardTextCurrency;
Card.Icon = CardIcon;
Card.Progress = CardProgress;
Card.ProgressText = CardProgressText;

export { Card };
