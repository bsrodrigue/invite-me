import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "@rneui/base";
import { Formik } from "formik";
import { Text, View } from "react-native";
import * as Yup from "yup";
import { RegisterInput } from "../../api/auth";
import { pmubLogo } from "../../assets";
import { AuthForm, BaseAuthFormFooter, CheckBox, DateTimePicker, TextInput } from "../../components";
import { RootStackParamList } from "../../types";
import { useState } from "react";

const registerSchema = Yup.object().shape({
  username: Yup.string().required("Champ requis"),
  password: Yup.string().required("Champ requis"),
  birthDate: Yup.string().required("Champ requis"),
  name: Yup.string().required("Champ requis"),
});

const initialValues = {
  username: "",
  password: "",
  birthDate: new Date().toISOString(),
  name: "",
}

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [acceptChecked, setAcceptChecked] = useState(false);

  return (
    <AuthForm>
      <View style={{ flex: 1, justifyContent: "center", paddingVertical: 15 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values: RegisterInput) => {
            if (!acceptChecked) return;
            navigation.navigate('NewComer', JSON.stringify(values));
          }}>
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <View>
                <Header />

                <TextInput
                  inputMode="tel"
                  errorMessage={errors.username}
                  value={values.username}
                  onChangeText={handleChange('username')}
                  placeholder="Veuillez saisir votre numéro de téléphone" />

                <TextInput
                  inputMode="text"
                  errorMessage={errors.name}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Veuillez saisir votre nom" />

                <DateTimePicker date={new Date()} onChange={(value) => {
                  handleChange('birthDate')(value.toISOString());
                }} mode="date" />

                <TextInput
                  secureTextEntry
                  errorMessage={errors.password}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Veuillez saisir votre mot de passe" />

                <CheckBox
                  checked={acceptChecked}
                  onPress={() => setAcceptChecked(!acceptChecked)}
                  title="
          En m'inscrivant j'accepte les Conditions d'Utilisation"/>

              </View>
              <BaseAuthFormFooter
                submitTitle="Inscription"
                onPressTitle={handleSubmit}
              />
            </>
          )}
        </Formik>

      </View>
    </AuthForm>
  )
}

function Header() {
  return (
    <>
      <View>
        <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>
          <Image style={{
            resizeMode: "contain",
            width: 150,
            height: 150
          }} source={pmubLogo} />
        </View>
        <Text style={{
          textAlign: "center",
          color: "red",
          fontWeight: "bold",
          fontSize: 16,
        }}>Les lots aux gagnants, les bénéfices au Faso</Text>
      </View>
      <Text style={{
        textAlign: "center",
        color: "red",
        fontWeight: "bold",
        fontSize: 20,
        textTransform: "uppercase",
        marginVertical: 20
      }}>Inscription</Text>

    </>
  )
}
