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
import Crypto from '../../lib/crypto';
import { Text } from '../Text';
import { AccountPicker } from '../AccountPicker';

interface CreateBudgetFormProps {
  onCreate: (budget: Budget) => void;
}

export default function CreateBudgetForm({ onCreate }: CreateBudgetFormProps) {
  const { theme: { colors: { primary, error } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [limitDate, setLimitDate] = useState<Date>();
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState("");

  const isValid = (title && limit);

  const onSubmit = () => {
    const uuid = Crypto.generateRandomUUID();
    const data: Budget = {
      uuid,
      title, linkedAccount: accountId,
      limitDate: limitDate?.toISOString() ?? "",
      balance: parseInt(limit),
    }

    onCreate(data);
  };

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text weight='700' style={{ fontSize: 18 }}>Create Budget</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>
      <TextInput label={`Budget name`} onChangeText={setTitle} />
      <TextInput label={`Budget Limit`} keyboardType='numeric' onChangeText={setLimit} />
      {
        optionsEnabled && (
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>Date Limit</Text>
            <DateTimePicker date={limitDate} mode="date" onChange={(value) => setLimitDate(value)} />
          </View>
        )
      }
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>Linked Account</Text>
        <AccountPicker currentId={accountId} onSelect={(id) => setAccountId(id)} />
      </View>
      <Button disabled={!isValid} title="Submit" onPress={onSubmit} />
    </ExpandingView>
  );
}
