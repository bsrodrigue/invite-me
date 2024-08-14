import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Button } from "../../components";
import { RootStackParamList } from "../../types";
import { useWelcomeStyles } from "./useWelcomeStyles";
import { Image } from "@rneui/base";
import { pmubLogo } from "../../assets";
import { useTheme } from "@rneui/themed";
import { useState } from "react";

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const styles = useWelcomeStyles();
  const { theme: { colors: { yellow, green } } } = useTheme();

  const goToLoginScreen = async () => {
    navigation.navigate("Login")
  }

  const goToRegisterScreen = async () => {
    navigation.navigate("Register")
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{
          display: "flex",
          alignItems: "center"
        }}>
          <Image
            resizeMode="contain"
            source={pmubLogo} style={{
              height: 250,
              width: 250
            }} />
        </View>

        <View style={{
          display: "flex",
          gap: 10
        }}>
          <Button onPress={goToLoginScreen} size="sm" titleStyle={{ fontSize: 30 }} color={green}>CONNEXION</Button>
          <Button onPress={goToRegisterScreen} size="sm" titleStyle={{ fontSize: 30, color: "black" }} color={yellow}>INSCRIPTION</Button>
        </View>

      </View>
    </View>
  )
}
