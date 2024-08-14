import { useTheme } from '@rneui/themed';
import { View } from 'react-native'
import { Row } from '../Row';
import { Account } from '../../types/models';
import { getRealBalanceFromAccount } from '../../lib/account';
import { useTransactionStore } from '../../stores/transaction.store';
import { baseCurrency } from '../../config';
import { Text } from '../Text';

interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const { theme: { colors: { white, success, error, greyOutline } } } = useTheme();
  const { items: transactions } = useTransactionStore();
  const { title, type } = account;

  const [total, incomes, expenses] = getRealBalanceFromAccount(account, transactions);

  return (
    <View style={{
      backgroundColor: white,
      padding: 10, paddingHorizontal: 20, borderRadius: 20,
      borderColor: greyOutline, borderWidth: 1,
      marginHorizontal: 5,
    }}>
      <View>
        <Text weight="700" style={{ opacity: 0.5, fontSize: 10 }}>{type}</Text>
        <Text weight="700" style={{ fontSize: 20 }}>{title}</Text>
      </View>
      <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
        <Text weight="700" style={{ opacity: 0.5 }}>Total Balance</Text>
        <Text weight="700" style={{ fontSize: 20 }}>{`${total.toLocaleString()} ${baseCurrency}`}</Text>
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <View>
          <Text weight='600' style={{ color: success }}>Incomes</Text>
          <Text>{`${incomes.toLocaleString()} ${baseCurrency}`}</Text>
        </View>

        <View>
          <Text weight='600' style={{ color: error }}>Expenses</Text>
          <Text>{`${expenses.toLocaleString()} ${baseCurrency}`}</Text>
        </View>
      </Row>
    </View>
  );
}
