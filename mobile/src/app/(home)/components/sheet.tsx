import BottomSheet from "@gorhom/bottom-sheet";
import React, { ReactNode, RefObject } from "react";
import {
  Text,
  TextProps,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

type SheetProps = {
  children: ReactNode;
  sheetRef: RefObject<BottomSheet>;
};

type SheetHeaderAndBodyProps = ViewProps & {
  children: ReactNode;
};

type SheetTextAndIconProps = TextProps & {
  children: ReactNode;
};

type SheetButtonProps = {
  children: ReactNode;
  onPress: () => void;
};

function Sheet({ children, sheetRef }: SheetProps) {
  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={["80%", "45%"]}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: "#040507",
        flex: 1,
      }}
      style={{
        paddingHorizontal: 18,
      }}
    >
      {children}
    </BottomSheet>
  );
}

function SheetHeader({ children, ...rest }: SheetHeaderAndBodyProps) {
  return <View {...rest}>{children}</View>;
}

function SheetBody({ children, ...rest }: SheetHeaderAndBodyProps) {
  return <View {...rest}>{children}</View>;
}

function SheetText({ children, ...rest }: SheetTextAndIconProps) {
  return <Text {...rest}>{children}</Text>;
}

function SheetButton({ children, onPress }: SheetButtonProps) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

function SheetIcon({ children }: SheetTextAndIconProps) {
  return children;
}

Sheet.Header = SheetHeader;
Sheet.Body = SheetBody;
Sheet.Text = SheetText;
Sheet.Button = SheetButton;
Sheet.Icon = SheetIcon;

export { Sheet };
