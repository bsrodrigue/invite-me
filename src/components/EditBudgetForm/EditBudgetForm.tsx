import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { DateTimePicker } from '../DateTimePicker';
import { Budget } from '../../types/models';
import { useAccountStore } from '../../stores';
import { Text } from '../Text';
import { AccountPicker } from '../AccountPicker';

interface EditBudgetFormProps {
  budget: Budget;
  onEdit: (budget: Budget) => void;
  onDelete: (uuid: string) => void;
};

export default function EditBudgetForm({ budget, onEdit, onDelete }: EditBudgetFormProps) {
  const { theme: { colors: { error, black } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [accountId, setAccountId] = useState(budget.linkedAccount);
  const [dateLimit, setDateLimit] = useState<Date>(budget.limitDate ? new Date(budget?.limitDate) : null);
  const [title, setTitle] = useState(budget.title);
  const [limit, setLimit] = useState(budget.balance.toString());
  const { items: accounts } = useAccountStore();

  const onSubmit = () => {
    const data: Budget =
      Object.assign(budget, {
        title, balance: parseFloat(limit),
        linkedAccount: accountId, limitDate: dateLimit
      });
    onEdit(data);
  };

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text weight='700' style={{ fontSize: 18 }}>Edit Budget</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>

      <TextInput label={`Budget name`} defaultValue={title} onChangeText={setTitle} />
      <TextInput label={`Budget Limit`} keyboardType='numeric' defaultValue={limit} onChangeText={setLimit} />

      {
        accounts.length != 0 && (<>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>Linked Account</Text>
          <AccountPicker currentId={accountId} onSelect={setAccountId} />
        </>)
      }

      {
        optionsEnabled && (
          <>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 14, }}>Date Limit</Text>
              <DateTimePicker date={dateLimit} mode="date" onChange={(value) => setDateLimit(value)} />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Button onPress={() => onDelete(budget.uuid)} color={error}
                titleStyle={{ color: black, opacity: 0.5, fontWeight: "bold" }}>Delete Budget</Button>
              <Text style={{ fontWeight: "bold", fontSize: 12, color: error, marginTop: 5 }}>
                Warning: Deleting your budget will also lead to losing all your related transactions
              </Text>
            </View>
          </>
        )
      }

      <Button title="Submit" onPress={onSubmit} />
    </ExpandingView>
  );
}
