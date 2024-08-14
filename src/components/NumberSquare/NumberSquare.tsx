import { useTheme } from "@rneui/themed";
import { TouchableOpacity, Text } from "react-native";

interface NumberSquareProps {
  num: number | string;
  isPicked?: boolean;
  onPress?: () => void;
}

export default function NumberSquare({ num, onPress, isPicked }: NumberSquareProps) {
  const { theme: { colors: { blue, black } } } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        aspectRatio: "1/1",
        backgroundColor: isPicked ? black : blue,
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        padding: 1
      }}>
      <Text style={{
        color: "white",
        fontWeight: "bold",
        fontSize: 20
      }}>
        {num}
      </Text>
    </TouchableOpacity>
  )
}
