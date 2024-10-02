import { Formik } from "formik";
import { Button, TextInput, View } from "react-native";
import * as yup from "yup";
import theme from "../theme";
import Text from "./Text";

const reviewValidationSchema = yup.object().shape({
  repositoryOwner: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100")
    .required("Rating is required"),
  review: yup.string().optional(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <View style={theme.forms.container}>
      <Formik
        validationSchema={reviewValidationSchema}
        initialValues={{
          repositoryOwner: "",
          repositoryName: "",
          rating: "",
          review: "",
        }}
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
                touched.repositoryOwner && errors.repositoryOwner
                  ? theme.forms.inputError
                  : null,
              ]}
              placeholder="Repository owner name"
              onChangeText={handleChange("repositoryOwner")}
              onBlur={handleBlur("repositoryOwner")}
              value={values.repositoryOwner}
            />
            {errors.repositoryOwner && touched.repositoryOwner && (
              <Text style={theme.forms.error}>{errors.repositoryOwner}</Text>
            )}
            <TextInput
              style={[
                theme.forms.input,
                touched.repositoryName && errors.repositoryName
                  ? theme.forms.inputError
                  : null,
              ]}
              placeholder="Repository name"
              onChangeText={handleChange("repositoryName")}
              onBlur={handleBlur("repositoryName")}
              value={values.repositoryName}
            />
            {errors.repositoryName && touched.repositoryName && (
              <Text style={theme.forms.error}>{errors.repositoryName}</Text>
            )}
            <TextInput
              style={[
                theme.forms.input,
                touched.rating && errors.rating ? theme.forms.inputError : null,
              ]}
              placeholder="Rating between 0 and 100"
              keyboardType="numeric"
              onChangeText={handleChange("rating")}
              onBlur={handleBlur("rating")}
              value={values.rating}
            />
            {errors.rating && touched.rating && (
              <Text style={theme.forms.error}>{errors.rating}</Text>
            )}
            <TextInput
              style={[
                theme.forms.input,
                touched.review && errors.review ? theme.forms.inputError : null,
              ]}
              placeholder="Review"
              multiline
              onChangeText={handleChange("review")}
              onBlur={handleBlur("review")}
              value={values.review}
            />
            {errors.review && touched.review && (
              <Text style={theme.forms.error}>{errors.review}</Text>
            )}

            <Button title="Create a review" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export const ReviewForm = () => {
  const onSubmit = async (values) => {
    const { repositoryOwner, repositoryName, rating, review } = values;

    try {
      console.log(repositoryOwner, repositoryName, rating, review);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFormContainer onSubmit={onSubmit} />;
};
