import { useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Transaction, TransactionType } from '../../types/models';
import { useEffect, useState } from 'react';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { useBudgetStore, useCategoryStore } from '../../stores';
import { Text } from '../Text';
import { FilterBadge } from '../FilterBadge';
import { transactionTypeColors, transactionTypes } from '../../config';
import { CategoryPicker } from '../CategoryPicker';
import { BudgetPicker } from '../BudgetPicker';
import { DateTimePicker } from '../DateTimePicker';
import { AccountPicker } from '../AccountPicker';

interface EditTransactionFormProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (uuid: string) => void;
}

export default function EditTransactionForm({ transaction, onEdit, onDelete }: EditTransactionFormProps) {
  const { theme: { colors: { error, black, primary } } } = useTheme();
  const [optionsIsActive, setOptionsIsActive] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>(transaction.type);
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [categoryId, setCategoryId] = useState(transaction.categoryId);
  const [date, setDate] = useState(new Date(transaction.date));
  const [time, setTime] = useState(new Date(transaction.time));
  const [budgetId, setBudgetId] = useState(transaction?.budgetId);
  const [accountId, setAccountId] = useState(transaction?.accountId);

  const [sourceAccountId, setSourceAccountId] = useState(transaction?.sourceAccountId);
  const [destinationAccountId, setDestinationAccountId] = useState(transaction?.destinationAccountId);

  const { items: categories } = useCategoryStore();
  const { items: budgets } = useBudgetStore();

  const height = useSharedValue(10);

  const isTransfer = (transactionType === "Transfer");
  const isValid = title && amount && date && time;
  const budget = budgets.find((budget) => budget.uuid === budgetId);

  const onSubmit = () => {
    const data: Transaction =
      Object.assign(transaction,
        {
          title, amount: parseFloat(amount), categoryId,
          budgetId: budget?.uuid || "",
          accountId: budget?.linkedAccount || accountId,
          type: transactionType, sourceAccountId, destinationAccountId,
          date, time,
        });

    onEdit(data);
  }

  useEffect(() => {
    height.value = withSpring(optionsIsActive ? 30 : 10);
  }, [optionsIsActive]);

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Edit Transaction</Text>
        <ToggleButton onChange={(active) => setOptionsIsActive(active)} />
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {transactionTypes.map((filter, index) => (
          <FilterBadge
            onPress={(value) => setTransactionType(value as TransactionType)}
            activeColor={transactionTypeColors[transactionType] ?? primary}
            label={filter} active={transactionType === filter} key={index} />
        ))}
      </Row>

      <TextInput
        label={`${transaction.type} name`}
        defaultValue={transaction.title}
        onChangeText={setTitle}
      />

      <TextInput
        label={`Amount`}
        keyboardType='numeric'
        defaultValue={amount}
        onChangeText={setAmount}
      />

      {
        !isTransfer && categories.length != 0 &&
        (<CategoryPicker
          currentId={categoryId}
          onSelect={(id) => setCategoryId(id)} />)
      }

      <View style={{ marginBottom: 10 }}>
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

      {
        optionsIsActive && (
          <View style={{ marginVertical: 10, }}>
            <Button onPress={() => onDelete(transaction.uuid)} color={error}
              titleStyle={{ color: black, opacity: 0.5, fontWeight: "bold" }}>Delete Transaction</Button>
            <Text style={{ fontWeight: "bold", fontSize: 12, color: error, marginTop: 5 }}>
              Warning: Deleting your transaction is irreversible
            </Text>
          </View>
        )
      }

      <Row style={{ gap: 5 }}>
        <DateTimePicker label="Date" containerStyle={{ flexGrow: 1 }} date={date} onChange={setDate} mode="date" />
        <DateTimePicker label="Time" containerStyle={{ flexGrow: 1 }} date={time} onChange={setTime} mode="time" />
      </Row>

      <Button title="Submit" onPress={onSubmit} disabled={!isValid} />
    </ExpandingView>
  );
}
