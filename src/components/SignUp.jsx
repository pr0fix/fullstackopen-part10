import { View, TextInput, Pressable, Text } from "react-native";
import * as yup from "yup";
import theme from "../theme";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const signupValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Username must be at most 30 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(30, "Password must be at most 30 characters long"),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation doesn't match given password"
    )
    .required("Password confirmation is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View style={theme.forms.container}>
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{ username: "", password: "", passwordConfirm: "" }}
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

            <TextInput
              style={[
                theme.forms.input,
                touched.passwordConfirm && errors.passwordConfirm
                  ? theme.forms.inputError
                  : null,
              ]}
              placeholder="Password confirmation"
              secureTextEntry
              onChangeText={handleChange("passwordConfirm")}
              onBlur={handleBlur("passwordConfirm")}
              value={values.passwordConfirm}
            />
            {errors.passwordConfirm && touched.passwordConfirm && (
              <Text style={theme.forms.error}>{errors.passwordConfirm}</Text>
            )}

            <Pressable style={theme.forms.inputButton} onPress={handleSubmit}>
              <Text style={theme.forms.inputButtonText}>Sign up</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [signUp, { loading, error }] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      if (data) {
        try {
          await signIn({ username, password });
        } catch (e) {
          console.error("There was an error while signing in: ", e);
        } finally {
          navigate("/repositories");
        }
      }
    } catch (e) {
      console.error("There was an error while signing up: ", e);
    }
  };

  return (
    <View>
      <SignUpContainer onSubmit={onSubmit} />
      {loading && <Text>Signing up...</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};

export default SignUp;
