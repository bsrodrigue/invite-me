import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import React, { useRef, useState } from "react";
import { BackHandler, View } from "react-native";
import PagerView from "react-native-pager-view";
import { AuthForm } from "../../components";
import { RootStackParamList } from "../../types";

type SetupAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'SetupAccount'>;

export default function SetupAccountScreen({ navigation }: SetupAccountScreenProps) {
  const { theme: { colors: { primary, grey5 } } } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formValues, setFormValues] = useState<object>();
  const _pagerRef = useRef(null);

  const updateFormValues = (values: Partial<object>) => {
    setFormValues((prev) => ({ ...prev, ...values }));
  }

  const next = (values: Partial<object>) => {
    if (currentStepIndex < steps.length - 1) {
      _pagerRef.current.setPage(currentStepIndex + 1);
    }
    updateFormValues(values);
  };

  const previous = () => {
    if (currentStepIndex !== 0) {
      _pagerRef.current.setPage(currentStepIndex - 1);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        previous();
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [currentStepIndex])
  );

  const steps = [
  ]

  return (
    <View style={{ flex: 1 }}>
      <AuthForm
      >
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 15 }}>
          {[1, 2, 3].map((number) => (
            <View key={number}
              style={{
                backgroundColor: number <= currentStepIndex + 1 ? primary : grey5, width: 30,
                borderRadius: 25, justifyContent: "center", alignItems: "center", height: 10
              }} />
          ))
          }
        </View>
        <PagerView
          ref={_pagerRef}
          scrollEnabled={false}
          onPageSelected={(e) => {
            setCurrentStepIndex(e.nativeEvent.position);
          }} initialPage={0} style={{ flex: 1 }}>
        </PagerView>
      </AuthForm>
    </View>
  )
}
