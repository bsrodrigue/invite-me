import { Icon, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { Transaction } from '../../types/models';
import { baseCurrency, transactionTypeColors, transactionTypeSign } from '../../config';
import { useAccountStore, useBudgetStore, useCategoryStore } from '../../stores';
import { mom } from '../../lib/moment';
import { Text } from '../Text';
import { Row } from '../Row';

interface TransactionHistoryItemProps {
  transaction: Transaction;
}

export default function TransactionHistoryItem({ transaction: { title, type, amount, budgetId, accountId, categoryId, sourceAccountId, destinationAccountId, createdAt } }: TransactionHistoryItemProps) {
  const { theme: { colors: { greyOutline, warning } } } = useTheme();
  const { items } = useBudgetStore()
  const { items: accounts } = useAccountStore()
  const { items: categories } = useCategoryStore()

  //TODO: Fix this, it is terrible for performance.
  const category = categories.find((item) => item.uuid === categoryId);

  const budget = items.find((item) => item.uuid === budgetId);
  const account = accounts.find((item) => (item.uuid === accountId));
  const sourceAccount = accounts.find((item) => item.uuid === sourceAccountId);
  const destinationAccount = accounts.find((item) => item.uuid === destinationAccountId);

  const maxChars = 30;

  return (
    <View style={[{
      borderWidth: 1,
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderColor: greyOutline
    }]}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View style={{
            aspectRatio: 1,
            borderRadius: 50,
            padding: 5,
            marginRight: 5,
            backgroundColor: (type === "Transfer") ? warning : category?.color || greyOutline,
          }}>
            {
              category && (
                <Icon
                  size={16}
                  color="white"
                  name={category.iconName}
                  type={category.iconFamily} />
              )
            }
            {
              !category && type !== "Transfer" && (
                <Icon size={16} style={{ opacity: 0.5 }} type='antdesign' name="questioncircle" />
              )
            }
            {
              !category && type === "Transfer" && (
                <Icon size={16} color="white" type='font-awesome' name="exchange" />
              )
            }
          </View>
          <View>
            {
              type !== "Transfer" ? (
                <Text style={{ fontWeight: "bold", fontSize: 10, opacity: 0.5 }}>
                  {`${budget?.title ?? "No Budget"} | ${account?.title ?? "No Account"}`}
                </Text>
              ) : (
                <Text style={{ fontWeight: "bold", fontSize: 10, opacity: 0.5 }}>
                  {`${sourceAccount?.title ?? "No Source Account"} -> ${destinationAccount?.title ?? "No Destination Account"}`}
                </Text>
              )
            }
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>{title.length >= maxChars ? `${title.slice(0, maxChars)}...` : title}</Text>
          </View>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Row style={{ alignItems: "center", gap: 5 }}>
            <Row>
              <Text weight="500" style={{ fontSize: 10, opacity: 0.5 }}>{mom(createdAt).format("DD/MM/YY")} </Text>
              <Text weight="500" style={{ fontSize: 10, opacity: 0.5 }}>{mom(createdAt).format("HH:MM")}</Text>
            </Row>
            <Icon size={10} name="clock" type="feather" />
          </Row>
          <Text weight='700' style={{ color: transactionTypeColors[type] }}>{`${transactionTypeSign[type]}${amount} ${baseCurrency}`}</Text>
        </View>
      </View>
    </View>
  );
}
