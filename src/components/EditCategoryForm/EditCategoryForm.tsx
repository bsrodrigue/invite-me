import { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { Text } from '../Text';

import iconData from "../../constants/icon_data.json";
import { ExpandingView } from '../ExpandingView';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { TransactionCategory } from '../../types/models';
import { IconPicker } from '../IconPicker';
import { iconTitleToTypeMap, pickerColors } from '../../config';
import { IconPickerButton } from '../IconPickerButton';
import { ColorPicker } from '../ColorPicker';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { useTheme } from '@rneui/themed';

const iconTitles = Object.keys(iconData).filter((key) => iconTitleToTypeMap[key] !== undefined);

const getFamilyIcons = (title: string) => iconData[title];
const getFamilyType = (title: string) => iconTitleToTypeMap[title];

interface CreateCategoryFormProps {
  category: TransactionCategory;
  onEdit: (category: TransactionCategory) => void;
  onDelete: (uuid: string) => void;
}

export default function CreateCategoryForm({ category, onEdit, onDelete }: CreateCategoryFormProps) {
  const { height } = Dimensions.get('window');
  const { theme: { colors: { black, error } } } = useTheme();
  const [title, setTitle] = useState(category.title);
  const [search, setSearch] = useState("");
  const [activePicker, setActivePicker] = useState("");
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [pickedIcon, setPickedIcon] = useState({
    name: category.iconName,
    type: category.iconFamily,
  });
  const [pickedColor, setPickedColor] = useState(category.color);
  const familyTitle = iconTitles[0];

  const iconPickerIsOpen = (activePicker === "icon");
  const colorPickerIsOpen = (activePicker === "color");

  const icons = getFamilyIcons(familyTitle).filter((icon: string) => icon.includes(search.toLowerCase()));

  const isValid = title && pickedIcon;

  const onSubmit = () => {
    const data: TransactionCategory =
      Object.assign(category, { title, iconName: pickedIcon.name, iconFamily: pickedIcon.type, color: pickedColor });
    onEdit(data);
  }

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ alignItems: "center", marginBottom: 20, justifyContent: "space-between" }}>
        <Text weight='700' style={{ fontSize: 18 }}>{`${iconPickerIsOpen ? "Select Icon" : "Create Category"}`}</Text>
        {
          !activePicker && (
            <>
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
              <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
            </>
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

            {
              optionsEnabled && (
                <>
                  <View style={{ marginVertical: 10 }}>
                    <Button onPress={() => onDelete(category.uuid)} color={error} titleStyle={{ color: black, opacity: 0.5, fontWeight: "bold" }}>Delete Category</Button>
                    <Text style={{ fontWeight: "bold", fontSize: 12, color: error, marginTop: 5 }}>
                      Warning: Deleting your category is irreversible
                    </Text>
                  </View>
                </>
              )
            }
            <Button disabled={!isValid} onPress={onSubmit} title="Submit" />
          </>
        )
      }

    </ExpandingView>
  );
}

