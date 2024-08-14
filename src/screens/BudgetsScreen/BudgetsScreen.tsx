import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import {
  BudgetCard, CardBottomSheet, CreateBudgetForm,
  EditBudgetForm, ExpandingView, ScreenDivider, Text
} from "../../components"
import { FAB } from "@rneui/base";
import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { Icon, useTheme } from "@rneui/themed";
import { useState } from "react";
import { useBudgetStore } from "../../stores";

type BudgetsScreenProps = NativeStackScreenProps<RootStackParamList, 'Budgets'>;

export default function BudgetsScreen({ navigation, route }: BudgetsScreenProps) {
  const { theme: { colors: { black, primary, white } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const { items, create, update, remove } = useBudgetStore();

  return (
    <ExpandingView>
      <ScreenDivider />
      <View style={{
        backgroundColor: white,
        padding: 20, paddingHorizontal: 20,
      }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          data={items}
          ListEmptyComponent={
            <View style={{ opacity: 1, justifyContent: "center", alignItems: "center", flex: 1, margin: "auto" }}>
              <Icon size={50} name="cash" type="ionicon" color={white} />
              <Text weight="700" style={{ color: white, marginTop: 10 }}>You have no budgets</Text>
            </View>
          }
          keyExtractor={(_item, number) => number.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onLongPress={() => setEditingBudget(item)}>
              <BudgetCard budget={item} />
            </TouchableOpacity>
          )} />
      </View>

      <FAB
        onPress={() => setCreateFormIsVisible(true)}
        title="Create Budget" size="small"
        color={primary} placement="right" titleStyle={{ fontSize: 12, fontFamily: "font-700" }} />

      <CardBottomSheet isVisible={createFormIsVisible} onBackdropPress={() => setCreateFormIsVisible(false)}>
        <CreateBudgetForm
          onCreate={(budget) => {
            create(budget);
            setCreateFormIsVisible(false);
          }} />
      </CardBottomSheet>

      <CardBottomSheet isVisible={Boolean(editingBudget)} onBackdropPress={() => setEditingBudget(null)}>
        <EditBudgetForm
          budget={editingBudget}
          onEdit={(budget) => {
            update(budget);
            setEditingBudget(null);
          }}
          onDelete={(uuid) => {
            remove(uuid);
            setEditingBudget(null);
          }}
        />
      </CardBottomSheet>
    </ExpandingView>
  )
}
