import { Input, InputProps } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { forwardRef } from "react";
import { View, ViewStyle } from "react-native";
import { Text } from "../Text";
import { Row } from "../Row";

type TextInputProps = {
  name?: string;
  label?: string;
  wrapperStyle?: ViewStyle;
  suffix?: string;
} & InputProps;

const TextInput = forwardRef(({ onChange, wrapperStyle, label, inputStyle, errorStyle, suffix, ...props }: TextInputProps, ref) => {
  const { theme: { colors: { error, greyOutline } } } = useTheme();
  const borderRadius = 50;
  const backgroundColor = "#f1eff2";

  return (
    <View style={[{
      position: "relative",
      borderWidth: 1,
      borderRadius,
      marginVertical: 5,
      borderColor: greyOutline
    }, wrapperStyle]}>
      {
        label && (
          <Row>
            <Text
              style={{
                position: "absolute",
                zIndex: 1,
                left: 20,
                top: 0,
                fontSize: 10,
                opacity: 0.5,
              }} weight="700">{label}</Text>
          </Row>
        )
      }
      <Input
        errorStyle={
          [
            {
              position: "absolute",
              bottom: -10,
              right: 25,
              backgroundColor: props.errorMessage ? "white" : "transparent",
              paddingHorizontal: 5,
              borderRadius,
              zIndex: 1,
              fontStyle: "italic"
            }, errorStyle
          ]
        }
        containerStyle={{
          backgroundColor,
          borderRadius,
        }}
        inputStyle={
          [
            {
              fontSize: 12,
              fontFamily: "font-600",
              height: 30
            },
            inputStyle
          ]
        }
        disabledInputStyle={{
          fontSize: 18,
          fontFamily: "font-600",
          opacity: 1
        }}
        inputContainerStyle={{
          borderColor: props.errorMessage ? error : backgroundColor,
          borderRadius,
          paddingHorizontal: 10,
          marginHorizontal: -10
        }}
        {...props}
        ref={ref}
      />

    </View>
  )
});

export default TextInput;
