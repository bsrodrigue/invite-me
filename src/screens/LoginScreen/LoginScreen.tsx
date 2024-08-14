import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { View, Text } from "react-native";
import * as Yup from "yup";
import useCall from "../../api/useCall";
import { AuthForm, BaseAuthFormFooter, TextInput } from "../../components";
import { RootStackParamList } from "../../types";

const loginSchema = Yup.object().shape({
  identifier: Yup.string().required("Champ requis"),
  password: Yup.string().required("Champ requis"),
});

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {

  const { call, isLoading } = useCall(() => { }, {
    onSuccess() {
    },
  });

  return (
    <AuthForm>
      <View style={{ flex: 1, justifyContent: "center", paddingVertical: 15 }}>
        <Formik
          initialValues={{
            identifier: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            call(values);
          }}>
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <View>
                <Text style={{
                  textAlign: "center",
                  color: "red",
                  fontWeight: "bold",
                  fontSize: 28,
                  textTransform: "uppercase",
                  marginVertical: 20
                }}>Connexion</Text>
                <TextInput
                  errorMessage={errors.identifier}
                  value={values.identifier}
                  onChangeText={handleChange('identifier')}
                  placeholder="Veuillez saisir votre numéro de téléphone ou nom d'utilisateur" />
                <TextInput
                  secureTextEntry
                  errorMessage={errors.password}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Veuillez saisir votre mot de passe" />
              </View>
              <BaseAuthFormFooter
                submitTitle="Connexion"
                loading={isLoading}
                onPressTitle={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </AuthForm>
  )
}
