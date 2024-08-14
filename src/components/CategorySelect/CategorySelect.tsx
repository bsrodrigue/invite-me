import { useState } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { View, Text, TouchableOpacity } from 'react-native'
import { Row } from '../Row';
import { Icon } from '@rneui/base';
import { useTheme } from '@rneui/themed';

const categories = [
  "Electricity",
  "Water",
  "Internet",
  "Fuel",
  "Clothes",
  "Gift",
  "Uncategorized"
];

interface CategorySelectProps {
}

export default function CategorySelect({ }: CategorySelectProps) {
  const { theme: { colors: { primary } } } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const fontSize = useSharedValue(14);

  const handleNextCategory = () => {
    if (categoryIndex >= categories.length - 1) return;
    setCategoryIndex(categoryIndex + 1);
  }

  const handlePreviousCategory = () => {
    if (categoryIndex <= 0) return;
    setCategoryIndex(categoryIndex - 1);
  }

  return (
    <View style={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Text style={{
        fontWeight: "bold",
      }}>Category</Text>
      <Row style={{ justifyContent: "space-between", alignItems: "center", flex: 1 }}>
        <TouchableOpacity onPress={handlePreviousCategory}>
          <Icon name="arrow-left" color={primary} size={35} />
        </TouchableOpacity>
        <Animated.Text
          style={{
            fontWeight: "bold",
            fontSize,
            color: primary
          }}>
          {categories[categoryIndex]}
        </Animated.Text>
        <TouchableOpacity onPress={handleNextCategory}>
          <Icon name="arrow-right" color={primary} size={35} />
        </TouchableOpacity>
      </Row>
    </View>
  );
}
