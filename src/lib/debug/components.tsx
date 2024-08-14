import { getObjKeys } from ".";
import { Text, View } from "react-native";

interface ObjectProps {
  obj: object;
}

export function ObjectDebug({ obj }: ObjectProps) {
  return (
    getObjKeys(obj).map((key: string) => (
      <View key={key} style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }} >{key}: </Text>
        <Text >{obj[key]}</Text>
      </View>
    ))
  );
}
