import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Transaction, TransactionType } from '../../types/models';
import { transactionTypeColors, transactionTypes } from '../../config';
import { DateTimePicker } from '../DateTimePicker';
import { Selector } from '../Selector';
import { useAccountStore, useBudgetStore, useCategoryStore } from '../../stores';
import Crypto from '../../lib/crypto';
import { Text } from '../Text';
import { CategoryPicker } from '../CategoryPicker';
import { BudgetPicker } from '../BudgetPicker';
import { AccountPicker } from '../AccountPicker';

interface CreateTransactionFormProps {
  onCreate: (transaction: Transaction) => void;
}

export default function CreateTransactionForm({ onCreate }: CreateTransactionFormProps) {
  const { theme: { colors: { primary } } } = useTheme();
  const [transactionType, setTransactionType] = useState<TransactionType>("Expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [budgetId, setBudgetId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [accountId, setAccountId] = useState("");

  const [sourceAccountId, setSourceAccountId] = useState("");
  const [destinationAccountId, setDestinationAccountId] = useState("");

  const { items: categories } = useCategoryStore();
  const { items: budgets } = useBudgetStore();

  const isTransfer = (transactionType === "Transfer");

  const isValid = title && amount && date && time;
  const budget = budgets.find((budget) => budget.uuid === budgetId);

  const onSubmit = () => {
    const uuid = Crypto.generateRandomUUID();

    const data: Transaction = {
      uuid,
      title,
      date: date.toISOString(),
      time: time.toISOString(),
      amount: parseFloat(amount),
      type: transactionType,
      accountId: budget?.linkedAccount || accountId,
      budgetId: budget?.uuid || "",
      categoryId,
      sourceAccountId,
      destinationAccountId
    }

    onCreate(data);
  };

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text weight='700' style={{ fontSize: 18 }}>Create Transaction</Text>
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {transactionTypes.map((filter, index) => (
          <FilterBadge
            onPress={(value) => setTransactionType(value as TransactionType)}
            activeColor={transactionTypeColors[transactionType] ?? primary}
            label={filter} active={transactionType === filter} key={index} />
        ))}
      </Row>

      <TextInput label={`${transactionType} name`} onChangeText={setTitle} />

      <TextInput wrapperStyle={{ flexGrow: 1 }} label="Amount" keyboardType="numeric" onChangeText={setAmount} />

      {
        !isTransfer && categories.length != 0 &&
        (<CategoryPicker
          currentId={categoryId}
          onSelect={(id) => setCategoryId(id)} />)
      }
      <View>
        {
          !isTransfer && (
            <BudgetPicker currentId={budgetId} onSelect={(id) => setBudgetId(id)} />
          )
        }
      </View>
      <View>
        {
          !isTransfer && !budget?.linkedAccount && (
            <AccountPicker currentId={accountId} onSelect={(id) => setAccountId(id)} />
          )
        }
      </View>

      {
        isTransfer && (
          <View style={{ flexGrow: 1, justifyContent: "space-between" }}>
            <Text style={{
              fontWeight: "bold",
            }}>Source Account</Text>
            <AccountPicker
              currentId={sourceAccountId}
              onSelect={(id) => setSourceAccountId(id)} />
            {
              sourceAccountId && (
                <>
                  <Text style={{
                    fontWeight: "bold",
                  }}>Destination Account</Text>
                  <AccountPicker
                    currentId={destinationAccountId}
                    exclude={[sourceAccountId]}
                    onSelect={(id) => setDestinationAccountId(id)} />
                </>
              )

            }
          </View>

        )
      }

      <Row style={{ gap: 5 }}>
        <DateTimePicker label="Date" containerStyle={{ flexGrow: 1 }} date={date} onChange={setDate} mode="date" />
        <DateTimePicker label="Time" containerStyle={{ flexGrow: 1 }} date={time} onChange={setTime} mode="time" />
      </Row>
      <Button disabled={!isValid} onPress={onSubmit} title="Submit" />
    </ExpandingView>
  );
}
