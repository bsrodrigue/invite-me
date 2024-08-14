import { View } from 'react-native'

interface SpacingProps {
  vertical?: boolean;
  horizontal?: boolean;
  size?: number;
}

export default function Spacing({ vertical, horizontal, size = 25 }: SpacingProps) {

  return (
    <View style={{
      marginHorizontal: horizontal ? size : 0,
      marginVertical: vertical ? size : 0,
    }} />
  );
}
