import { useTheme } from '@rneui/themed';
import { View } from 'react-native'

interface ScreenDividerProps {

}

export default function ScreenDivider({ }: ScreenDividerProps) {
  const dividerRadius = 25;
  const { theme: { colors: { white, black } } } = useTheme();


  return (
    <View style={{ backgroundColor: black }}>
      <View style={{
        backgroundColor: white, width: "70%",
        height: 5, borderTopRightRadius: dividerRadius,
        borderBottomRightRadius: dividerRadius,
        marginBottom: 25
      }} />
    </View>

  );
}
