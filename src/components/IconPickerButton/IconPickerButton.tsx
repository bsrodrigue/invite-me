import { Icon, useTheme } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text";

interface IconPickerButtonProps {
  onPress: () => void;
  icon?: { name: string; type: string };
  color?: string;
}

export default function IconPickerButton({ icon, color, onPress }: IconPickerButtonProps) {
  const { theme: { colors: { white, greyOutline, black } } } = useTheme();

  return (
    <TouchableOpacity style={{ marginVertical: 10 }} onPress={onPress}>
      <View
        style={{
          borderRadius: 5, backgroundColor: white, borderColor: greyOutline,
          borderWidth: 1,
          padding: 10, marginVertical: 5, justifyContent: "center", alignItems: "center",
          height: 50
        }}>
        {
          icon && (
            <Icon size={18} color={color ?? black} name={icon?.name} type={icon?.type} />
          )
        }
        <Text weight='500'>Select Icon</Text>
      </View>
    </TouchableOpacity>
  );
}
