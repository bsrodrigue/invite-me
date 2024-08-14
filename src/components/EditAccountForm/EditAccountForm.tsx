import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Account, AccountType } from '../../types/models';
import { accountTypes } from '../../constants';
import { Text } from '../Text';

interface EditAccountFormProps {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (uuid: string) => void;
}

export default function EditAccountForm({ account, onEdit, onDelete }: EditAccountFormProps) {
  const { theme: { colors: { primary, error, black } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [title, setTitle] = useState(account.title);
  const [type, setType] = useState(account.type);

  const onSubmit = () => {
    const data: Account = Object.assign(account, { title, type });
    onEdit(data);
  }

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text weight="700" style={{ fontSize: 18 }}>Edit Account</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {accountTypes.map((filter, index) => (
          <FilterBadge onPress={(value) => setType(value as AccountType)} activeColor={primary} label={filter} active={type === filter} key={index} />
        ))}
      </Row>

      <TextInput label={`Account name`} defaultValue={title} onChangeText={setTitle} />

      {
        optionsEnabled && (
          <View style={{ marginVertical: 10 }}>
            <Button onPress={() => onDelete(account.uuid)} color={error} titleStyle={{ color: black, opacity: 0.5, fontFamily: "font-700" }}>Delete Account</Button>
            <Text weight="700" style={{ fontSize: 12, color: error, marginTop: 5 }}>
              Warning: Deleting your account will also lead to losing all your related transactions
            </Text>
          </View>
        )
      }

      <Button onPress={onSubmit} title="Submit" />
    </ExpandingView>
  );
}
