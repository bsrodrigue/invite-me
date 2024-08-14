import { useTheme } from "@rneui/themed";
import Animated, { interpolate, interpolateColor, runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { TouchableOpacity } from 'react-native'
import { Text } from "../Text";

interface ToggleButtonProps {
  onChange?: (active: boolean) => void;
}

export default function ToggleButton({ onChange }: ToggleButtonProps) {
  const { theme: { colors: { primary, greyOutline, grey2, primaryLight } } } = useTheme();
  const toggled = useSharedValue(0);

  const toggleButtonAnimatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      toggled.value,
      [0, 1],
      [greyOutline, primaryLight]
    )
  }));

  const toggleButtonAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      toggled.value,
      [0, 1],
      [grey2, primary]
    ),

    transform: [
      {
        translateX: interpolate(
          toggled.value,
          [0, 1],
          [0, 23]
        )
      }
    ]
  }));

  return (
    <TouchableOpacity style={{ alignItems: "flex-end", gap: 3 }} onPress={() => {
      const isToggled = toggled.value === 1;
      toggled.value = withSpring(toggled.value === 1 ? 0 : 1, {}, () => {
        //Takes too much time to trigger
      });

      runOnUI(() => {
        runOnJS(onChange)(!isToggled);
      })();
    }}>
      <Text weight="700" style={{ opacity: 0.5, fontSize: 10 }}>Advanced options</Text>
      <Animated.View
        style={[toggleButtonAnimatedContainerStyle, {
          width: 40, height: 15, borderRadius: 25,
          flexDirection: "row", alignItems: "center", paddingVertical: 5, paddingHorizontal: 3
        }]}>
        <Animated.View style={[toggleButtonAnimatedStyle, { height: 10, width: 10, borderRadius: 50 }]} />
      </Animated.View>
    </TouchableOpacity>
  );
}
