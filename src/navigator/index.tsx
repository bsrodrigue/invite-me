import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MainScreen, SettingsScreen
} from "../screens";

const Stack = createNativeStackNavigator();

function PublicStack() {
  return (
    <Stack.Navigator
      initialRouteName={
        "Main"
      } screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}>
      <Stack.Screen name='Main' component={MainScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: true, headerTitle: "Paramètres" }} />
    </Stack.Navigator>
  );
}

export default function RootStackNavigator() {
  return (
    <NavigationContainer>
      <PublicStack />
    </NavigationContainer>
  );
}
