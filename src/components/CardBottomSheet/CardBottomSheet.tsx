import { BottomSheet, Card } from "@rneui/base";
import { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";

type CardBottomSheetProps = {
  isVisible?: boolean;
  onBackdropPress?: () => void;
  children?: ReactNode;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  bottomSheet: {
    margin: 0,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    flex: 1,
    paddingHorizontal: 10,
    overflow: "hidden"
  }
});

export default function CardBottomSheet({ isVisible, onBackdropPress, children, style }: CardBottomSheetProps) {

  return (
    <BottomSheet
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}>
      <Card containerStyle={[styles.bottomSheet, style]}>
        {children}
      </Card>
    </BottomSheet>
  )
}
