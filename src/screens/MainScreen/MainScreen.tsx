import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon, useTheme } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header, LogoutDialog } from "../../components";
import { RootStackParamList } from "../../types";
import { HomeScreen } from "../HomeScreen";
import { AccountsScreen } from "../AccountsScreen";
import { BudgetsScreen } from "../BudgetsScreen";
import { CategoriesScreen } from "../CategoriesScreen";
import { EventsScreen } from "../EventsScreen";

interface TabIconProps {
  icon: string;
  focused: boolean;
  type?: string;
}

function TabIcon({ icon, focused, type = "font-awesome" }: TabIconProps) {
  const { theme: { colors: { black, greyOutline } } } = useTheme();

  return (
    <Icon color={focused ? black : greyOutline} name={icon} type={type} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
});

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation }: MainScreenProps) {
  const [logoutDialogIsvisible, setLogoutDialogIsVisible] = useState(false);
  const { theme: { colors: { black, white } } } = useTheme();

  return (
    <View style={styles.container}>
      <LogoutDialog
        isVisible={logoutDialogIsvisible}
        onDismissDialog={() => setLogoutDialogIsVisible(false)} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingVertical: 10,
            height: 60,
            borderTopWidth: 0,
            shadowColor: white,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: "font-700",
            marginBottom: 5,
            color: black,
          },
          header: () => (
            <Header
              onPressLogout={() => setLogoutDialogIsVisible(true)}
              onPressSettings={() => navigation.navigate("Settings")}
            />
          )
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => <TabIcon icon="home" focused={focused} />,
          }}
          name="Home"
          component={HomeScreen} />
        <Tab.Screen
          options={{
            tabBarLabel: "Events",
            tabBarIcon: ({ focused }) => <TabIcon icon="event" type="material" focused={focused} />,
          }}
          name="Events"
          component={EventsScreen} />
      </Tab.Navigator>
    </View >
  )
}
