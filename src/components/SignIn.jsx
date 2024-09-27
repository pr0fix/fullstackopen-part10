import React from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "../theme";

const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, ({ min }) => `Username must be at least ${min} characters long.`)
    .required("Username is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters long.`)
    .required("Password is required"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={theme.signInForm.container}>
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
                theme.signInForm.input,
                touched.username && errors.username
                  ? theme.signInForm.inputError
                  : null,
              ]}
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {errors.username && touched.username && (
              <Text style={theme.signInForm.error}>{errors.username}</Text>
            )}

            <TextInput
              style={[
                theme.signInForm.input,
                touched.password && errors.password
                  ? theme.signInForm.inputError
                  : null,
              ]}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={theme.signInForm.error}>{errors.password}</Text>
            )}

            <Button title="Sign in" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
