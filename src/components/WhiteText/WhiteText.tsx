import { useTheme } from '@rneui/themed';
import { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native'

interface WhiteTextProps {
  children?: ReactNode;
  style?: TextStyle;
}

export default function WhiteText({ children, style }: WhiteTextProps) {
  const { theme: { colors: { white } } } = useTheme();

  return (
    <Text style={[{ color: white }, style]}>{children}</Text>
  );
}
