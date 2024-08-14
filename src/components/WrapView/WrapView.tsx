import { ReactNode } from 'react';
import { View } from 'react-native'

//TODO: Make padding configurable
interface WrapViewProps {
  children?: ReactNode;
}

export default function WrapView({ children }: WrapViewProps) {

  return (
    <View style={{ paddingHorizontal: 30 }}>{children}</View>
  );
}
