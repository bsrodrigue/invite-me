import { ThemeProvider } from "@rneui/themed";
import { decode } from "base-64";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useCachedResources } from "./src/hooks";
import RootStackNavigator from "./src/navigator";
import { SessionProvider } from "./src/providers";
import { lightTheme } from "./src/themes";
import { Image } from "@rneui/base";

if (typeof atob === 'undefined') {
  global.atob = decode;
}

export default function App() {
  const { isLoadingComplete, session } = useCachedResources();

  if (!isLoadingComplete) {
    return <Image style={{
      resizeMode: "contain",
      width: 150,
    }} />
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <StatusBar hidden translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <SessionProvider initialSession={session}>
          <RootStackNavigator />
        </SessionProvider>
        <Toast />
      </SafeAreaView>
    </ThemeProvider>
  );
}
