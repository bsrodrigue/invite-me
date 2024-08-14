import { View } from 'react-native'

interface ColorDotProps {
  color?: string;
  size?: number;
}

export default function ColorDot({ color = 'black', size = 10 }: ColorDotProps) {

  return (
    <View style={{
      aspectRatio: 1,
      height: size,
      width: size,
      borderRadius: 25,
      backgroundColor: color
    }} />
  );
}
