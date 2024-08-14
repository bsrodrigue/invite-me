import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import React, { useState } from "react";
import { CardBottomSheet, CreateTransactionForm, EditTransactionForm, ExpandingView, FilterBadge, Row, ScreenDivider, TotalBalanceCard, TransactionList } from "../../components";
import { View } from "react-native";
import { useTheme } from "@rneui/themed";
import { FAB } from "@rneui/base";
import { useTransactionStore } from "../../stores/transaction.store";
import { Text } from "../../components";
import { mom } from "../../lib/moment";
import { setDayToStart, setMonthToStart, setWeekToStart } from "../../lib/datetime";
import { debounce } from "../../lib/utils";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const timeFilters = [
  "Daily",
  "Weekly",
  "Monthly",
];

const timeFilterHandlers = {
  "Daily": setDayToStart,
  "Weekly": setWeekToStart,
  "Monthly": setMonthToStart,
}

const timeFilterStrs = {
  "Daily": "Today",
  "Weekly": "This Week",
  "Monthly": "This Month",
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme: { colors: { white, black, primary } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [timeFilterIndex, setTimeFilter] = useState(0);

  const { items: transactions, create, update, remove } = useTransactionStore();

  const timeFilter = timeFilterHandlers[timeFilters[timeFilterIndex]](new Date());
  const timeFilterStr = timeFilterStrs[timeFilters[timeFilterIndex]];
  const filtertedTransactions = transactions.filter((t) => new Date(t.createdAt) >= timeFilter)

  return (
    <ExpandingView style={{ backgroundColor: white }}>
      <View style={{ position: "relative", marginBottom: "25%" }}>
        <ScreenDivider />
        <View style={{
          backgroundColor: black,
          height: 100,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }} />
        <View style={{ paddingHorizontal: 15, position: "absolute", left: 0, right: 0, top: 25 }}>
          <TotalBalanceCard />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <View>
          <Text weight="700" style={{ opacity: 0.5, marginBottom: 10 }}>Transactions</Text>
          <Row style={{ gap: 5 }}>
            {timeFilters.map((filter, index) => (
              <FilterBadge
                label={filter}
                active={index === timeFilterIndex}
                onPress={() => setTimeFilter(index)}
                key={index} />
            ))}
          </Row>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <Text weight="700" style={{ fontSize: 12 }}>{`${mom(timeFilter).format("dddd - DD/MM/YY")}`}</Text>
        <TransactionList
          transactions={filtertedTransactions}
          emptyStr={`No Transactions ${timeFilterStr}`}
          onPress={setEditingTransaction}
          contentContainerStyle={{
            paddingBottom: 50
          }}
        />
      </View>

      <FAB
        onPress={() =>
          setCreateFormIsVisible(true)}
        title="Create Transaction"
        size="small" color={primary}
        placement="right" titleStyle={{ fontSize: 12, fontFamily: "font-700" }} />

      <CardBottomSheet
        isVisible={createFormIsVisible}
        onBackdropPress={() => setCreateFormIsVisible(false)}>
        <CreateTransactionForm
          onCreate={(transaction) => {
            create(transaction);
            setCreateFormIsVisible(false);
          }} />
      </CardBottomSheet>

      <CardBottomSheet
        isVisible={Boolean(editingTransaction)}
        onBackdropPress={() => setEditingTransaction(null)}
      >
        <EditTransactionForm
          transaction={editingTransaction}
          onEdit={(transaction) => {
            update(transaction);
            setEditingTransaction(null);
          }}
          onDelete={(uuid) => {
            remove(uuid);
            setEditingTransaction(null);
          }}
        />
      </CardBottomSheet>

    </ExpandingView>
  );
}

