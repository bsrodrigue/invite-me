import { StyleSheet, View } from "react-native";
import { Button } from "../Button";

const styles = StyleSheet.create({
  submit: {
    fontSize: 20,
    fontFamily: "Quicksand-700",
  },
});

type BaseAuthFormFooterProps = {
  submitTitle: string;
  onPressTitle?: () => void;
  loading?: boolean;
}

export default function Footer({ submitTitle,
  onPressTitle,
  loading,
}: BaseAuthFormFooterProps) {
  return (
    <View >
      <Button
        title={submitTitle}
        titleStyle={styles.submit}
        onPress={onPressTitle}
        loading={loading}
        size="lg"
        containerStyle={{
          marginVertical: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
        buttonStyle={{
          flex: 1,
          maxWidth: 200,
        }}
      />
    </View>
  )
}
