import { Icon, useTheme } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text";
import { useUserStore } from "../../stores";
import { truncate } from "../../lib/utils";

type HeaderProps = {
  searchMode?: boolean;
  onSearchPress?: () => void;
  onPressSettings?: () => void;
  onPressNotifications?: () => void;
  onChange?: (value: string) => void;
  onPressLogout?: () => void;
  loading?: boolean;
  screen?: string;
};

export default function Header({ onPressSettings, screen }: HeaderProps) {
  const { theme: { colors: { grey1, black, white } } } = useTheme();
  const { user } = useUserStore();
  const username = truncate(user?.username || "User", 15);

  return (
    <View style={{ backgroundColor: black, alignItems: "center", flexDirection: "row", justifyContent: "center", padding: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center", flexGrow: 1 }}>
        <View >
          <Text style={{ color: white, fontSize: 12, opacity: 0.5 }}  >Welcome back</Text>
          <Text weight="700" style={{ color: white, fontSize: 25 }}>{username}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          onPressSettings?.();
        }}
        style={{ flexGrow: 1, alignItems: "flex-end" }}>
        <View style={{ padding: 7, backgroundColor: grey1, borderRadius: 50, aspectRatio: 1 }}>
          <Icon color={white} type="font-awesome" name="cog" />
        </View>
      </TouchableOpacity>
    </View>

  )
}
