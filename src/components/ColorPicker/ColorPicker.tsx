import { useRef } from 'react';
import { FlatList, TouchableOpacity } from 'react-native'

interface ColorPickerProps {
  colors: string[];
  onPick: (color: string) => void;
}

export default function ColorPicker({ colors, onPick }: ColorPickerProps) {
  const colsRef = useRef(5);

  return (
    <FlatList
      bounces
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: 'center',
        gap: 10
      }}
      numColumns={colsRef.current}
      data={colors}
      renderItem={({ item }: { item: string }) =>
      (
        <TouchableOpacity
          onPress={() =>
            onPick(item)
          }
          style={{
            aspectRatio: 1, borderRadius: 50, backgroundColor: item,
            height: 50,
            marginVertical: 5, justifyContent: "center", alignItems: "center"
          }}>
        </TouchableOpacity>
      )
      } />
  );
}
