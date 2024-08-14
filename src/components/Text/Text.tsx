import { ReactNode } from 'react';
import { TextStyle } from 'react-native';
import { Text as BaseText } from "@rneui/themed";

interface TextProps {
  children?: ReactNode
  style?: TextStyle;
  weight?: "regular" | "300" | "500" | "600" | "700";
}

export default function Text({ children, style, weight = "regular" }: TextProps) {

  return (
    <BaseText bold style={[{
      fontFamily: `font-${weight}`
    }, style]}>{children}</BaseText>
  );
}
