import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 15,
    paddingTop: 100,
  },

  title: {
    fontSize: 40,
    fontFamily: "Quicksand-700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 20,
    fontFamily: "Quicksand-600",
    opacity: 0.5,
    textAlign: "center"
  },

  confirm: {
    fontSize: 20,
    fontFamily: "Quicksand-700",
  }
});


type SuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'Success'>;

export default function SuccessScreen({ navigation, route }: SuccessScreenProps) {
  const { } = route.params;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}></Text>
        <Text style={styles.subtitle}></Text>
      </View>
      <TouchableOpacity onPress={async () => {
        //navigation.navigate()
      }}>
        <Text style={styles.confirm}></Text>
      </TouchableOpacity>
    </View>
  )
}
