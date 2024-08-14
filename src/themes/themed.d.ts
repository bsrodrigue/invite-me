import '@rneui/themed';

declare module '@rneui/themed' {
  export interface TextProps {
    bold: boolean;
  }

  export interface ComponentTheme {
    Text: Partial<TextProps>;
  }
}
