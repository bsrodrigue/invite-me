import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FlatList, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../types";
import { Button, CardBottomSheet, ExpandingView, Text, TextInput } from "../../components";
import { useState } from "react";
import { useAsyncStorage } from "../../lib/storage";
import { useUserStore } from "../../stores";

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { theme: { colors: { error } } } = useTheme();
  const { user: { username }, update, clear: clearUser } = useUserStore();
  const { storeData, clearData } = useAsyncStorage();
  const [fullname, setFullname] = useState(username);
  const [userProfileEditorIsOpen, setUserProfileEditorIsOpen] = useState(false);

  const onChangeFullname = () => {
    update({ username: fullname });
    setUserProfileEditorIsOpen(false);
    storeData('username', fullname);
  }

  const settings = [
    {
      title: "Account Settings",
      children:
        [
          {
            title: "Change your username",
            onPress: () => {
              setUserProfileEditorIsOpen(true);
            }
          },
          {
            title: "Export data",
            onPress: () => { }
          },
          {
            title: "Import data",
            onPress: () => { }
          },
          {
            title: "Clear data",
            danger: true,
            onPress: () => {
              clearUser();
              clearData();
            }
          },
        ]
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingVertical: 10 }}>
      <FlatList data={settings}
        renderItem={({ index, item: { title, children } }) => (
          <View key={index} style={{ paddingHorizontal: 40, marginVertical: 5 }}>
            <Text weight="700" style={{ opacity: 0.5 }}>{title}</Text>
            <View style={{ marginVertical: 10 }}>
              <FlatList
                data={children} renderItem={({ index, item }) => (
                  <TouchableOpacity
                    onPress={item.onPress}
                    style={{ marginVertical: 10 }} key={index}>
                    <Text weight="600" style={{ color: item?.danger ? error : "black" }}>{item.title}</Text>
                  </TouchableOpacity>
                )} />
            </View>
          </View>
        )} />
      <CardBottomSheet
        isVisible={userProfileEditorIsOpen}
        onBackdropPress={() => setUserProfileEditorIsOpen(false)}>
        <ExpandingView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            defaultValue={fullname}
            onChangeText={setFullname} />
          <View style={{ height: 10 }} />
          <Button onPress={onChangeFullname}>Submit</Button>
        </ExpandingView>
      </CardBottomSheet>
    </View>
  )
}
