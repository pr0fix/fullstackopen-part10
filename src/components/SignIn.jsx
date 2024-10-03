import React from "react";
import { Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required"),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View style={theme.forms.container}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={[
                theme.forms.input,
                touched.username && errors.username
                  ? theme.forms.inputError
                  : null,
              ]}
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {errors.username && touched.username && (
              <Text style={theme.forms.error}>{errors.username}</Text>
            )}

            <TextInput
              style={[
                theme.forms.input,
                touched.password && errors.password
                  ? theme.forms.inputError
                  : null,
              ]}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={theme.forms.error}>{errors.password}</Text>
            )}

            <Button title="Sign in" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
