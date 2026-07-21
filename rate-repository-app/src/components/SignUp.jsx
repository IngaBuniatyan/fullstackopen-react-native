import { useMutation } from '@apollo/client/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
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
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async ({ password, username }) => {
      setSubmitError(null);

      try {
        await createUser({ variables: { user: { password, username } } });
        await signIn({ username, password });
        navigate('/');
      } catch (error) {
        setSubmitError(error.message);
      }
    },
  });

  return (
    <View style={styles.container}>
      <FormikTextInput
        accessibilityLabel="Username"
        autoCapitalize="none"
        formik={formik}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        accessibilityLabel="Password"
        formik={formik}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <FormikTextInput
        accessibilityLabel="Password confirmation"
        formik={formik}
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      {submitError && (
        <Text color="error" style={styles.error}>
          {submitError}
        </Text>
      )}
      <FormButton
        disabled={formik.isSubmitting}
        label="Sign up"
        onPress={formik.handleSubmit}
        testID="signup-button"
      />
    </View>
  );
};

export default SignUp;
