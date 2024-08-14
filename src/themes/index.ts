import { createTheme } from "@rneui/themed";

const commonColors = {
  primary: "#265073",
  primaryLight: "#C8D3DC",
  black: "black",
  white: "white",
  blue: "#186ff4",
  green: "#9BCF53",
  yellow: "#FFF455",
  error: "#FF204E",
  greyOutline: "#D9D9D9",
  grey0: "F5F4F4",
  grey1: "#363636",
}

export const lightTheme = createTheme({
  lightColors: commonColors,

  darkColors: {
    ...commonColors,
    background: "black",
    white: commonColors.black,
    black: commonColors.white,
  },

  components: {
    Text: {
      style: [
        {
          fontFamily: "font-600"
        }
      ]
    }
  }
});
