import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Text } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Account, AccountType } from '../../types/models';
import { accountTypes } from '../../constants';
import Crypto from '../../lib/crypto';

interface CreateAccountFormProps {
  onCreate: (account: Account) => void;
}

export default function CreateAccountForm({ onCreate }: CreateAccountFormProps) {
  const { theme: { colors: { primary } } } = useTheme();
  const [accountType, setAccountType] = useState<AccountType>("Cash");
  const [title, setTitle] = useState("");
  const [initialAmount, setInitialAmount] = useState("");

  const onSubmit = () => {
    const uuid = Crypto.generateRandomUUID();
    const data: Account = {
      uuid,
      type: accountType,
      title, balance: parseFloat(initialAmount),
    };
    onCreate(data);
  }

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Create Account</Text>
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {accountTypes.map((filter, index) => (
          <FilterBadge
            onPress={(value) => setAccountType(value as AccountType)}
            activeColor={primary} label={filter}
            active={accountType === filter} key={index} />
        ))}
      </Row>

      <TextInput label={`${accountType} name`} onChangeText={setTitle} />
      <TextInput label={`Initial Amount`} onChangeText={setInitialAmount} keyboardType="numeric" />

      <Button title="Submit" onPress={onSubmit} />
    </ExpandingView>
  );
}
