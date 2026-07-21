import { useMutation } from '@apollo/client/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import { CREATE_REVIEW } from '../graphql/mutations';
import FormButton from './FormButton';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  error: {
    marginBottom: 12,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  text: yup.string(),
});

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema,
    onSubmit: async ({ ownerName, repositoryName, rating, text }) => {
      setSubmitError(null);

      try {
        const { data } = await createReview({
          variables: {
            review: {
              ownerName,
              repositoryName,
              rating: Number(rating),
              text: text || undefined,
            },
          },
        });
        navigate(`/repositories/${data.createReview.repositoryId}`);
      } catch (error) {
        setSubmitError(error.message);
      }
    },
  });

  return (
    <View style={styles.container}>
      <FormikTextInput
        accessibilityLabel="Repository owner name"
        formik={formik}
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        accessibilityLabel="Repository name"
        formik={formik}
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        accessibilityLabel="Rating between 0 and 100"
        formik={formik}
        keyboardType="numeric"
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        accessibilityLabel="Review"
        formik={formik}
        multiline
        name="text"
        placeholder="Review"
      />
      {submitError && (
        <Text color="error" style={styles.error}>
          {submitError}
        </Text>
      )}
      <FormButton
        disabled={formik.isSubmitting}
        label="Create a review"
        onPress={formik.handleSubmit}
        testID="create-review-button"
      />
    </View>
  );
};

export default CreateReview;
