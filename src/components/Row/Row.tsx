import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native'

interface RowProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export default function Row({ children, style }: RowProps) {

  return (
    <View style={[{ flexDirection: "row" }, style]}>{children}</View>
  );
}
