import { View, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useBudgetStore } from '../../stores';
import { Text } from '../Text';

interface BudgetPickerProps {
  currentId: string;
  onSelect: (id: string) => void;
}

export default function BudgetPicker({ currentId, onSelect }: BudgetPickerProps) {
  const { theme: { colors: { greyOutline, primary, white } } } = useTheme();
  const { items } = useBudgetStore();

  return (
    <View style={{
      borderColor: greyOutline,
      borderWidth: 1,
      padding: 5,
      paddingVertical: 1,
      borderRadius: 50,
      flexWrap: "wrap",
      gap: 5,
      marginVertical: 5
    }}>
      <FlatList
        horizontal
        data={items}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: "100%"
        }}
        contentContainerStyle={{
          gap: 5
        }}
        renderItem={({ item }) => {
          const isActive = (currentId === item?.uuid);

          return (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                height: 30
              }}
              onPress={() => {
                onSelect(isActive ? "" : item?.uuid);
              }}>
              <View key={item?.uuid} style={{
                borderRadius: 50,
                backgroundColor: isActive ? primary : greyOutline,
                padding: 5, paddingHorizontal: 10
              }}>
                <Text weight='700' style={{ lineHeight: 16, color: white }}>{item?.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }
        }
      />

    </View>


  );
}
