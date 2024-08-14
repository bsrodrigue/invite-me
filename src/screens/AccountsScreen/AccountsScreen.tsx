import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { FAB } from "@rneui/base";
import {
  AccountCard, CardBottomSheet,
  CreateAccountForm, EditAccountForm, ExpandingView,
  ScreenDivider, Text
} from "../../components"
import { View, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { useTheme, Icon } from "@rneui/themed";
import { useState } from "react";
import { useAccountStore } from "../../stores";

type AccountsScreenProps = NativeStackScreenProps<RootStackParamList, 'Accounts'>;

export default function AccountsScreen({ navigation }: AccountsScreenProps) {
  const { theme: { colors: { primary, white } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const { items, create, update, remove } = useAccountStore();

  return (
    <ExpandingView>
      <ScreenDivider />
      <View style={{ flex: 1 }}>
        <View style={{
          backgroundColor: white,
          paddingHorizontal: 10,
          paddingVertical: 10,
          flex: 1
        }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: 50
            }}
            data={items}
            keyExtractor={(_item, number) => number.toString()}
            ListEmptyComponent={
              <View style={{ opacity: 1, justifyContent: "center", alignItems: "center", flex: 1, margin: "auto" }}>
                <Icon size={50} name="wallet" type="ionicon" color={primary} />
                <Text weight="700" style={{ color: primary, marginTop: 10 }}>You have no accounts</Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => setEditingAccount(item)}
              >
                <AccountCard account={item} />
              </TouchableOpacity>
            )} />
        </View>
      </View>

      <FAB
        onPress={() => setCreateFormIsVisible(true)}
        title="Create Account" size="small"
        color={primary} placement="right"
        titleStyle={{ fontSize: 12, fontFamily: "font-700" }} />

      <CardBottomSheet isVisible={createFormIsVisible} onBackdropPress={() => setCreateFormIsVisible(false)}>
        <CreateAccountForm
          onCreate={(account) => {
            create(account);
            setCreateFormIsVisible(false);
          }} />
      </CardBottomSheet>

      <CardBottomSheet isVisible={Boolean(editingAccount)} onBackdropPress={() => setEditingAccount(null)}>
        <EditAccountForm
          account={editingAccount}
          onEdit={(account) => {
            update(account);
            setEditingAccount(null);
          }}
          onDelete={(uuid) => {
            remove(uuid);
            setEditingAccount(null);
          }}
        />
      </CardBottomSheet>

    </ExpandingView>
  )
}
