import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface ExpandingViewProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export default function ExpandingView({ children, style }: ExpandingViewProps) {
  return (
    <View style={[{ flex: 1, backgroundColor: "white" }, style]}>
      {children}
    </View>
  );
}
