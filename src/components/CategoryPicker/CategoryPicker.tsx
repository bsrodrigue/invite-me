import { View, FlatList, TouchableOpacity } from 'react-native';
import { Row } from '../Row';
import { Icon, useTheme } from '@rneui/themed';
import { useCategoryStore } from '../../stores';
import { Text } from '../Text';

interface CategoryPickerProps {
  currentId: string;
  onSelect: (id: string) => void;
}

export default function CategoryPicker({ currentId, onSelect }: CategoryPickerProps) {
  const { theme: { colors: { greyOutline } } } = useTheme();
  const { items } = useCategoryStore();

  return (
    <View style={{
      borderColor: greyOutline,
      borderWidth: 1,
      padding: 5,
      borderRadius: 50,
      flexWrap: "wrap",
      gap: 5,
      marginVertical: 5
    }}>
      <FlatList
        horizontal
        data={items}
        showsVerticalScrollIndicator={false}
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
              <Row style={{ alignItems: "center", gap: 5 }}>
                <View key={item?.uuid} style={{ borderRadius: 50, backgroundColor: isActive ? item?.color : greyOutline, padding: 5, }}>
                  <Icon size={18} name={item?.iconName} type={item?.iconFamily} color="white" />
                </View>
                {
                  isActive && (
                    <View >
                      <Text weight='700' style={{ lineHeight: 16 }}>{item?.title}</Text>
                    </View>
                  )
                }
              </Row>
            </TouchableOpacity>
          );
        }
        }
      />

    </View>


  );
}
