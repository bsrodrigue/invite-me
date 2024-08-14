import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { CardBottomSheet, CreateCategoryForm, EditCategoryForm, ExpandingView, Row, ScreenDivider } from "../../components";
import { FAB } from "@rneui/base";
import { useRef, useState } from "react";
import { Icon, useTheme } from "@rneui/themed";
import { useCategoryStore } from "../../stores";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text } from "../../components";
import { truncate } from "../../lib/utils";

type CategoriesScreenProps = NativeStackScreenProps<RootStackParamList, 'Categories'>;

export default function CategoriesScreen({ navigation, route }: CategoriesScreenProps) {
  const { theme: { colors: { primary, greyOutline } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const { create, update, remove, items } = useCategoryStore();
  const colRef = useRef(2);

  return (
    <ExpandingView>
      <ScreenDivider />
      <FlatList
        numColumns={colRef.current}
        contentContainerStyle={{
          padding: 10,
          paddingHorizontal: 20
        }}
        columnWrapperStyle={{
          gap: 10
        }}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginVertical: 5,
              alignItems: "flex-start",
              borderRadius: 50,
              borderWidth: 1,
              borderColor: greyOutline,
              padding: 10,
              flexGrow: 1
            }}
            onLongPress={() => setEditingCategory(item)}
          >
            <Row style={{ alignItems: "center", gap: 10 }}>
              <View style={{ aspectRatio: 1, borderRadius: 50, backgroundColor: item?.color, padding: 10 }}>
                <Icon size={18} name={item?.iconName} type={item?.iconFamily} color="white" />
              </View>
              <Text weight="700" style={{
                fontSize: 12,
              }}>{truncate(item?.title || "", 10)}</Text>
            </Row>
          </TouchableOpacity>
        )} />


      <FAB
        onPress={() => setCreateFormIsVisible(true)}
        title="Create Category" size="small"
        color={primary} placement="right"
        titleStyle={{ fontSize: 12 }} />

      <CardBottomSheet isVisible={createFormIsVisible} onBackdropPress={() => setCreateFormIsVisible(false)}>
        <CreateCategoryForm
          onCreate={(category) => {
            create(category);
            setCreateFormIsVisible(false);
          }} />
      </CardBottomSheet>

      <CardBottomSheet isVisible={Boolean(editingCategory)} onBackdropPress={() => setEditingCategory(null)}>
        <EditCategoryForm
          category={editingCategory}
          onDelete={(uuid) => {
            remove(uuid);
            setEditingCategory(null);
          }}
          onEdit={(category) => {
            update(category);
            setEditingCategory(null);
          }}
        />
      </CardBottomSheet>

    </ExpandingView>
  )
}
