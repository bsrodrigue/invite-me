import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { ExpandingView } from "../../components";

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'ViewAccount'>;

export default function ViewAccountScreen({ navigation }: AccountScreenProps) {

  return (
    <ExpandingView style={{
      backgroundColor: "white",
      paddingVertical: 30
    }}></ExpandingView>
  )
}
