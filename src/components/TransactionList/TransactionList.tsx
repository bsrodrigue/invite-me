import { View, FlatList, TouchableOpacity, NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native'
import { CenteringView } from '../CenteringView';
import { TransactionHistoryItem } from '../TransactionHistoryItem';
import { Transaction } from '../../types/models';
import { Icon, useTheme } from '@rneui/themed';
import { Text } from '../Text';

interface TransactionListProps {
  transactions: Transaction[];
  emptyStr?: string;
  onPress?: (transaction: Transaction) => void;
  order?: "ascending" | "descending";
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function TransactionList({ transactions, emptyStr, order = "descending", onPress, onScroll, contentContainerStyle }: TransactionListProps) {
  const { theme: { colors: { black } } } = useTheme();

  return (
    <FlatList
      onScroll={onScroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
        [
          {
            gap: 5,
            paddingVertical: 10,
          },
          contentContainerStyle
        ]
      }
      keyExtractor={(item) => item.uuid}
      data={
        transactions.sort((t1, t2) =>
          order == "descending" ? (Date.parse(t2.createdAt) - Date.parse(t1.createdAt)) : (
            Date.parse(t1.createdAt) - Date.parse(t2.createdAt)
          )
        )
      }
      ListEmptyComponent={
        <CenteringView>
          <View style={{ opacity: 0.5 }}>
            <Icon size={50} name="inbox" type="feather" color={black} />
            <Text weight="700" style={{ marginTop: 10 }}>{emptyStr}</Text>
          </View>
        </CenteringView>
      }
      renderItem={({ item }) => (
        <TouchableOpacity onLongPress={() => onPress?.(item)}>
          <TransactionHistoryItem transaction={item} />
        </TouchableOpacity>
      )} />
  );
}
