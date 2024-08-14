import { useTheme } from '@rneui/themed';
import { useState, useEffect } from 'react';
import { View } from 'react-native'
import { Spacing } from '../Spacing';
import { Row } from '../Row';
import { ColorDot } from '../ColorDot';
import { shadowStyle } from '../../themes/shadow';
import { useAccountStore } from '../../stores';
import { Account, Transaction } from '../../types/models';
import { useTransactionStore } from '../../stores/transaction.store';
import { baseCurrency } from '../../config';
import { getRealBalanceFromAccount } from '../../lib/account';
import { Text } from '../Text';

interface TotalBalanceCardProps {

}

function getRealTotalBalance(accounts: Account[], allTransactions: Transaction[]) {
  let total = 0, incomes = 0, expenses = 0;

  for (const account of accounts) {
    const [t, i, e] = getRealBalanceFromAccount(account, allTransactions);
    total += t;
    incomes += i;
    expenses += e;
  }

  return [total, incomes, expenses];
}

export default function TotalBalanceCard({ }: TotalBalanceCardProps) {
  const [_state, _setState] = useState(null); // Replace by your state...
  const { theme: { colors: { white, primary, success, error } } } = useTheme();
  const { items: accounts } = useAccountStore();
  const { items: transactions } = useTransactionStore();

  const [total, incomes, expenses] = getRealTotalBalance(accounts, transactions);

  return (
    <View style={{
      backgroundColor: primary,
      padding: 20,
      borderRadius: 30,
      justifyContent: "space-between"
    }}>
      <View>
        <Text weight='500' style={{ color: white, opacity: 0.5 }}>Total Balance</Text>
        <Text weight='700' style={{ color: white, fontSize: 25 }}>{`${total.toLocaleString()} ${baseCurrency}`}</Text>
      </View>

      <Spacing vertical size={10} />

      <View>
        <Text weight='700' style={{ color: white, marginBottom: 5, }}>Activities</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <SubCard label='Incomes' balanceString={`${incomes.toLocaleString()} ${baseCurrency}`} color={success} />
          <SubCard label='Expenses' balanceString={`${expenses.toLocaleString()} ${baseCurrency}`} color={error} />
        </View>
      </View>
    </View>
  );
}

interface SubCardProps {
  label: string;
  balanceString: string;
  color: string;
}

function SubCard({ label, balanceString, color }: SubCardProps) {
  const { theme: { colors: { white } } } = useTheme();
  return (
    <View style={[{ backgroundColor: white, padding: 10, flexGrow: 1, borderRadius: 15 }, shadowStyle]}>
      <Row style={{ alignItems: "center", gap: 5 }}>
        <ColorDot color={color} />
        <Text weight='700' style={{ fontSize: 12, opacity: 0.8 }}>{label}</Text>
      </Row>
      <Text weight='500'>
        {balanceString}
      </Text>
    </View>
  );
}
