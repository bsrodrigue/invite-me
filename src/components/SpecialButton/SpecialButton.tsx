import { useTheme } from "@rneui/themed";
import { ReactNode } from "react";
import { View, Text } from "react-native";

interface SpecialButtonProps {
  children?: ReactNode;
}

export default function SpecialButton({ children }: SpecialButtonProps) {
  const { theme: { colors: { blue } } } = useTheme();

  return (

    <View
      style={{
        backgroundColor: blue,
        aspectRatio: "1/1",
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5
      }}>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 25
        }}>
        {children}
      </Text>
    </View>

  );
}
