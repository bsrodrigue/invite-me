import { Icon, useTheme } from '@rneui/themed';
import { FlatList, TouchableOpacity } from 'react-native'

interface IconPickerProps {
  icons: string[];
  type: string;
  onPick: (icon: string) => void;
}

export default function IconPicker({ icons, onPick, type }: IconPickerProps) {
  const { theme: { colors: { greyOutline, black } } } = useTheme();

  return (
    <FlatList
      bounces
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      numColumns={6}
      data={icons}
      renderItem={({ item }: { item: string }) =>
      (
        <TouchableOpacity
          onPress={() =>
            onPick(item)
          }
          style={{
            aspectRatio: 1, borderRadius: 50, backgroundColor: greyOutline,
            padding: 10, marginVertical: 5, justifyContent: "center", alignItems: "center"
          }}>
          <Icon size={18} color={black} name={item} type={type} />
        </TouchableOpacity>
      )
      } />
  );
}
