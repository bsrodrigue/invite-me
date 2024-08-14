import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { View, TouchableOpacity, ViewStyle } from "react-native";
import { Text } from "../Text";
import { mom } from "../../lib/moment";
import { Icon, useTheme } from "@rneui/themed";
import { Row } from "../Row";

type DateTimePickerProps = {
  date: Date;
  onChange: (value: Date) => void;
  mode: "date" | "time";
  errorMessage?: string;
  containerStyle?: ViewStyle;
  label?: string;
}

export default function DateTimePicker({ date, mode, errorMessage, onChange, containerStyle }: DateTimePickerProps) {
  const { theme: { colors: { black, greyOutline, error } } } = useTheme();

  const onOpenDatePicker = () => {
    DateTimePickerAndroid.open({
      mode,
      value: date ?? new Date(),
      onChange: (_e, date) => {
        onChange(date);
      },
    });
  }

  const format = (mode === "date") ? "DD MMMM YYYY" : "HH:mm";

  return (
    <TouchableOpacity
      style={[{
        marginVertical: 5,
        borderWidth: 1,
        borderColor: errorMessage ? error : greyOutline,
        borderRadius: 5,
        padding: 5,
        flexGrow: 1

      }, containerStyle]}
      onPress={onOpenDatePicker}>
      <Row style={{ alignItems: "center" }}>
        <Icon size={16} name={mode === "date" ? "calendar" : "clock"} type="feather" color={black} containerStyle={{ marginRight: 5, opacity: 0.5 }} />
        <View>
          <Text weight="700" style={{ fontSize: 10, opacity: 0.5 }}>{`Please select a ${mode}`}</Text>
          <Text weight="700" style={{ fontSize: 12 }}>{date ? mom(date).format(format) : "..."}</Text>
        </View>
        <Icon size={16} name="arrow-right" type="feather" color={black} containerStyle={{ marginLeft: "auto", opacity: 0.5 }} />
      </Row>
    </TouchableOpacity>
  )
}
