import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { AccountPicker, BudgetPicker, CategoryPicker, ExpandingView, FilterBadge, Row, ScreenDivider, TextInput, TransactionList } from "../../components"
import { useAccountStore, useBudgetStore, useCategoryStore, useTransactionStore } from "../../stores";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/themed";
import { Text } from "../../components";

type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

const filters = [
  "Account",
  "Budget",
  "Category"
];

export default function TransactionsScreen({ navigation, route }: TransactionsScreenProps) {
  const { items } = useTransactionStore();
  const { items: budgets } = useBudgetStore();
  const { items: accounts } = useAccountStore();
  const { items: categories } = useCategoryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterIndex, setFilterIndex] = useState(null);
  const [sorting, setSorting] = useState("Newest");

  const [accountId, setAccountId] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const filter = (filterIndex !== null) ? filters[filterIndex] : "";

  const filterStores = {
    "Account": accounts,
    "Budget": budgets,
    "Category": categories,
  };

  const filterIds = {
    "Account": accountId,
    "Budget": budgetId,
    "Category": categoryId,
  }

  const filterRelationKeys = {
    "Account": "accountId",
    "Budget": "budgetId",
    "Category": "categoryId",
  }

  const sortingsTypes = {
    "Newest": "descending",
    "Oldest": "ascending",
  }

  const filteredItems = items
    .filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((t) => {
      const id = filterIds[filter];
      if (!id) return true;
      const item = filterStores[filter].find((item: any) => item.uuid === id);
      return t?.[filterRelationKeys[filter]] === item?.uuid;
    });

  return (
    <ExpandingView >
      <ScreenDivider />
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => setSorting(sorting === "Newest" ? "Oldest" : "Newest")}
          style={{ opacity: 0.5 }}>
          <Row style={{ alignItems: "center", gap: 5 }}>
            <Text weight="700">{`Sort by ${sorting}`}</Text>
            <Icon type="material-community" name={`sort-clock-${sortingsTypes[sorting]}`} />
          </Row>
        </TouchableOpacity>
        <TransactionList
          transactions={filteredItems}
          emptyStr={`No Transactions Found`}
          order={sortingsTypes[sorting]}
        />
        <View style={{ paddingTop: 10 }}>
          <Row style={{ gap: 5, marginBottom: 5 }}>
            {
              filters.map((filter, index) => (
                <FilterBadge
                  key={filter}
                  label={filter}
                  active={filterIndex == index}
                  onPress={() => {
                    const alreadyActive = (filterIndex == index);
                    setFilterIndex(alreadyActive ? null : index);
                  }
                  }
                />
              ))
            }
          </Row>
          {
            filter === "Account" && (
              <AccountPicker currentId={accountId} onSelect={setAccountId} />
            )
          }
          {
            filter === "Budget" && (
              <BudgetPicker currentId={budgetId} onSelect={setBudgetId} />
            )
          }
          {
            filter === "Category" && (
              <CategoryPicker currentId={categoryId} onSelect={setCategoryId} />
            )
          }
          <TextInput placeholder={`Search for Transactions...`} onChangeText={setSearchTerm} />

        </View>
      </View>
    </ExpandingView>
  )
}
