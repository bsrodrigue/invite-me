import { ImageSourcePropType } from "react-native";
export * from "./routing";

export type StrapiError = {
  data: any;
  error: {
    details: object;
    message: string;
    name: string;
    status: number;
  }
}

export type Slide = {
  id: string;
  title: string;
  description: string;
  image?: ImageSourcePropType;
  nextTitle?: string
}

export type RadioInputOption = {
  label: string;
  value: string;
  imgSrc?: ImageSourcePropType;
}

export type TabItem = {
  label: string;
}
