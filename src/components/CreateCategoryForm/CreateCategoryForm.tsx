import { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { Text } from '../Text';

import iconData from "../../constants/icon_data.json";
import { ExpandingView } from '../ExpandingView';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { useTheme } from '@rneui/themed';
import { TransactionCategory } from '../../types/models';
import Crypto from '../../lib/crypto';
import { IconPicker } from '../IconPicker';
import { iconTitleToTypeMap, pickerColors } from '../../config';
import { IconPickerButton } from '../IconPickerButton';
import { ColorPicker } from '../ColorPicker';
import { Row } from '../Row';

const iconTitles = Object.keys(iconData).filter((key) => iconTitleToTypeMap[key] !== undefined);

const getFamilyIcons = (title: string) => iconData[title];
const getFamilyType = (title: string) => iconTitleToTypeMap[title];

interface CreateCategoryFormProps {
  onCreate: (category: TransactionCategory) => void;
}

export default function CreateCategoryForm({ onCreate }: CreateCategoryFormProps) {
  const { height } = Dimensions.get('window');
  const { theme: { colors: { black } } } = useTheme();
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [activePicker, setActivePicker] = useState("");
  const [pickedIcon, setPickedIcon] = useState(null);
  const [pickedColor, setPickedColor] = useState(black);
  const familyTitle = iconTitles[0];

  const iconPickerIsOpen = (activePicker === "icon");
  const colorPickerIsOpen = (activePicker === "color");

  const icons = getFamilyIcons(familyTitle).filter((icon: string) => icon.includes(search.toLowerCase()));

  const isValid = title && pickedIcon;

  const onSubmit = () => {
    const uuid = Crypto.generateRandomUUID();
    const data: TransactionCategory = {
      uuid,
      title,
      iconName: pickedIcon?.name,
      iconFamily: pickedIcon?.type,
      color: pickedColor
    };

    onCreate(data);
  }

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ alignItems: "center", marginBottom: 20, justifyContent: "space-between" }}>
        <Text weight='700' style={{ fontSize: 18 }}>{`${iconPickerIsOpen ? "Select Icon" : "Create Category"}`}</Text>
        {
          !activePicker && (
            <TouchableOpacity onPress={() => setActivePicker("color")}>
              <Row style={{ alignItems: "center", gap: 5 }}>
                <View style={{
                  borderRadius: 50,
                  backgroundColor: pickedColor,
                  aspectRatio: 1,
                  height: 10
                }} />
                <Text weight='700'>Select Color</Text>
              </Row>
            </TouchableOpacity>
          )
        }
      </Row>

      {
        iconPickerIsOpen && (
          <>
            <TextInput label={`Search icon`} placeholder="Enter icon name" onChangeText={setSearch} />
            <ExpandingView style={{ height: (height * 0.5) }}>
              <IconPicker
                icons={icons}
                type={getFamilyType(familyTitle)}
                onPick={(icon) => {
                  setPickedIcon({
                    name: icon,
                    type: getFamilyType(familyTitle),
                  })
                  setActivePicker("");
                }} />
            </ExpandingView>
          </>
        )
      }

      {
        colorPickerIsOpen && (
          <>
            <ExpandingView style={{ height: (height * 0.5) }}>
              <ColorPicker
                colors={pickerColors}
                onPick={(color) => {
                  setPickedColor(color)
                  setActivePicker("");
                }} />
            </ExpandingView>
          </>
        )
      }

      {
        !activePicker && (
          <>
            <TextInput value={title} label={`Category title`} placeholder="Enter the title of your category" onChangeText={setTitle} />
            <IconPickerButton icon={pickedIcon} color={pickedColor} onPress={() => setActivePicker("icon")} />
            <Button disabled={!isValid} onPress={onSubmit} title="Submit" />
          </>
        )
      }

    </ExpandingView>
  );
}

