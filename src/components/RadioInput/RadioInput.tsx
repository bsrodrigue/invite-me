import { CheckBox } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

type RadioInputProps = {
  label: string;
  imgSrc?: ImageSourcePropType;
  value: string;
  selected: string;
  onPress: (value: string) => void;
}

export default function RadioInput({ label, imgSrc, value, selected, onPress }: RadioInputProps) {
  const { theme: { colors: { primary, greyOutline } } } = useTheme();
  const checked = value === selected;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(value);
      }}
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        borderRadius: 10,
        borderColor: checked ? primary : greyOutline,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      {
        imgSrc && (
          <Image style={{ height: 45, width: 45 }} source={imgSrc} />
        )
      }
      <View style={{ alignItems: "center", }}>
        <CheckBox
          containerStyle={{ padding: 0 }}
          checked={checked}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={primary}
        />
        <Text style={{
          fontFamily: "Quicksand-600",
          textAlign: "center"
        }}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}
