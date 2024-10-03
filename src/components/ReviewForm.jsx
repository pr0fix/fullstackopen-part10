import { Formik } from "formik";
import { Button, TextInput, View } from "react-native";
import * as yup from "yup";
import theme from "../theme";
import Text from "./Text";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const reviewValidationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100")
    .required("Rating is required"),
  text: yup.string().optional(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <View style={theme.forms.container}>
      <Formik
        validationSchema={reviewValidationSchema}
        initialValues={{
          ownerName: "",
          repositoryName: "",
          rating: "",
          text: "",
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
                touched.ownerName && errors.ownerName
                  ? theme.forms.inputError
                  : null,
              ]}
              placeholder="Repository owner name"
              onChangeText={handleChange("ownerName")}
              onBlur={handleBlur("ownerName")}
              value={values.ownerName}
            />
            {errors.ownerName && touched.ownerName && (
              <Text style={theme.forms.error}>{errors.ownerName}</Text>
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
                touched.text && errors.text ? theme.forms.inputError : null,
              ]}
              placeholder="Review"
              multiline
              onChangeText={handleChange("text")}
              onBlur={handleBlur("text")}
              value={values.text}
            />
            {errors.text && touched.text && (
              <Text style={theme.forms.error}>{errors.text}</Text>
            )}

            <Button title="Create a review" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export const ReviewForm = () => {
  const [sendReview, { loading, error }] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await sendReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      if (data) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <ReviewFormContainer onSubmit={onSubmit} />
      {loading && <Text>Submitting review...</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};
