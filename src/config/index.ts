import Crypto from "../lib/crypto";
import { lightTheme } from "../themes";

const wrapperHorizontalPadding = 40;

export const transactionTypes = [
  "Expense",
  "Income",
  "Transfer"
];

const defaultIdGenerator = {
  generateId: Crypto.generateRandomUUID,
};

export const config = {
  wrapperHorizontalPadding,
  defaultIdGenerator,
};

export const transactionTypeColors = {
  "Expense": lightTheme.lightColors.error,
  "Income": lightTheme.lightColors.success,
  "Transfer": lightTheme.lightColors.warning
}

export const transactionTypeSign = {
  "Expense": "-",
  "Income": "+",
  "Transfer": "~"
}

export const baseCurrency = "FCFA";

export const iconTitleToTypeMap = {
  // "AntDesign": "antdesign",
  // "Entypo": "entypo",
  // "EvilIcons": "evilicon",
  // "Feather": "feather",
  // "FontAwesome": "font-awesome",
  // "FontAwesome5": "font-awesome-5",
  // "Fontisto": "fontisto",
  // "Foundation": "foundation",
  "Ionicons": "ionicon",
  // "MaterialIcons": "material",
  // "MaterialCommunityIcons": "material-community",
  // "Octicons": "octicon",
  // "SimpleLineIcons": "simple-line-icon",
  // "Zocial": "zocial"
};

export const pickerColors = [
  '#FF5733',  // Fiery Red
  '#33FF57',  // Vibrant Green
  '#3357FF',  // Deep Blue
  '#FF33A1',  // Bright Pink
  '#FF8C33',  // Orange Sunset
  '#33FFC1',  // Aqua Mint
  '#B833FF',  // Royal Purple
  '#FFD133',  // Golden Yellow
  '#33FFDA',  // Soft Cyan
  '#FF3366',  // Coral Red
  '#33D1FF',  // Sky Blue
  '#A6FF33',  // Lime Green
  '#FF8333',  // Peach Orange
  '#33FF83',  // Mint Green
  '#8C33FF',  // Violet
  '#FF338C',  // Magenta
  '#FFDB33',  // Lemon Yellow
  '#33FFD1',  // Turquoise
  '#FF5733',  // Tomato Red
  '#33A1FF',  // Bright Blue
  '#FF33D1',  // Hot Pink
  '#FFB833',  // Amber
  '#33FFB8',  // Pale Green
  '#5733FF',  // Indigo
  '#FF33FF',  // Electric Pink
  '#FFD700',  // Gold
  '#FF69B4',  // Hot Pink
  '#ADFF2F',  // Green Yellow
  '#7FFFD4',  // Aquamarine
  '#6495ED',  // Cornflower Blue
  '#FF4500',  // Orange Red
  '#DEB887',  // Burlywood
  '#4682B4',  // Steel Blue
  '#D2691E',  // Chocolate
  '#5F9EA0',  // Cadet Blue
  '#DC143C',  // Crimson
  '#FF1493',  // Deep Pink
  '#FFDAB9',  // Peach Puff
  '#00FA9A',  // Medium Spring Green
  '#FF6347',  // Tomato
  "#265073",
  "#C8D3DC",
  "black",
  "white",
  "#186ff4",
  "#9BCF53",
  "#FFF455",
  "#FF204E",
  "#D9D9D9",
  "F5F4F4",
  "#363636",
];
