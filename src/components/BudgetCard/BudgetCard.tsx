import { LayoutChangeEvent, View } from 'react-native'
import { Budget } from '../../types/models';
import { useTheme } from '@rneui/themed';
import { Row } from '../Row';
import { baseCurrency } from '../../config';
import { useTransactionStore } from '../../stores/transaction.store';
import { getRealBalanceFromBudget } from '../../lib/budget';
import { Text } from "../Text";
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { truncate } from '../../lib/utils';
import { Icon } from '@rneui/base';
import { mom } from '../../lib/moment';

interface BudgetCardProps {
  budget: Budget;
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const { title, balance } = budget;
  const { theme: { colors: { white, success, error, warning, greyOutline, primary, black } } } = useTheme();
  const { items: transactions } = useTransactionStore();
  const borderRadius = 10;
  const [currentBalance] = getRealBalanceFromBudget(budget, transactions);

  const truncatedTitle = truncate(title, 20);

  const percentage = ((currentBalance / balance) * 100).toFixed();
  const progressWidth = useSharedValue(20);
  const parentWidth = useSharedValue(0);

  useFocusEffect(useCallback(() => {
    const p = parseInt(percentage);

    if (parentWidth.value > 0) {
      progressWidth.value = withTiming(
        (((p > 0) ? (p > 100 ? 100 : p) : 0) / 100) * parentWidth.value, { duration: 800 }
      );
    }

    return () => {
      progressWidth.value = 20;
    }
  }, [percentage]));

  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    const p = parseInt(percentage);
    parentWidth.value = width;
    progressWidth.value = (((p > 0) ? (p > 100 ? 100 : p) : 0) / 100) * width;
  }


  function getColorByPercentage(percentage: number) {
    const thresholds = [30, 60, 100];
    const colors = [error, warning, success];

    const index = thresholds.findIndex(t => percentage <= t);
    if (index == -1) return success;
    return colors[index];
  }

  const color = getColorByPercentage(parseInt(percentage));

  return (
    <View style={{
      backgroundColor: white,
      padding: 15, paddingHorizontal: 20,
      borderRadius: 20, marginVertical: 5,
      borderWidth: 1, borderColor: greyOutline
    }}>
      <Row style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <View>
          <Text weight='700' style={{ fontSize: 16, color: primary }}>{truncatedTitle}</Text>
        </View>

        <Row style={{ justifyContent: "flex-end", gap: 5 }}>
          {
            budget?.limitDate && (
              <Row style={{ alignItems: "center", gap: 5, opacity: 0.5 }}>
                <Icon type="feather" name="clock" size={12} />
                <Text weight='700' style={{ fontSize: 10, color: black }}>{
                  mom(budget?.limitDate).format("DD/MM/YY")
                }</Text>
              </Row>
            )
          }
          <Animated.Text style={{ fontSize: 12, color, fontFamily: "font-700" }}>{`${percentage}%`}</Animated.Text>
        </Row>

      </Row>

      <View style={{ marginVertical: 5 }}>
        <Text weight='700' style={{ opacity: 0.7 }}>Total Balance</Text>
        <Text weight='700' style={{ fontSize: 25, }}>{`${balance.toLocaleString()} FCFA`}</Text>
      </View>

      <View onLayout={onLayout} style={{ position: "relative", backgroundColor: greyOutline, height: 20, borderRadius }}>
        <View style={{ zIndex: 1, position: "absolute", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
          <Text weight='700' style={{ fontSize: 14, opacity: 0.5 }}>{`${currentBalance.toLocaleString()} ${baseCurrency}`}</Text>
        </View>
        <Animated.View style={{ height: "100%", width: progressWidth, backgroundColor: color, borderRadius }} />
      </View>
    </View>
  );
}
