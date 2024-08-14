import { StyleSheet } from "react-native";

export function useWelcomeStyles() {

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      paddingVertical: 10,
      paddingHorizontal: 25,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
  });


}

