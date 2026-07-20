import { useFormik } from 'formik';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  field: {
    marginBottom: 12,
  },
  input: {
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    borderWidth: 1,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
    marginTop: 4,
  },
  submitError: {
    color: theme.colors.error,
    marginBottom: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 12,
  },
  buttonText: {
    color: 'white',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setSubmitError(null);

      try {
        await signIn(values);
        navigate('/');
      } catch (error) {
        setSubmitError(error.message);
      }
    },
  });

  const usernameHasError =
    Boolean(formik.touched.username) && Boolean(formik.errors.username);
  const passwordHasError =
    Boolean(formik.touched.password) && Boolean(formik.errors.password);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <TextInput
          accessibilityLabel="Username"
          autoCapitalize="none"
          onBlur={formik.handleBlur('username')}
          onChangeText={formik.handleChange('username')}
          placeholder="Username"
          style={[styles.input, usernameHasError && styles.inputError]}
          testID="username-input"
          value={formik.values.username}
        />
        {usernameHasError && (
          <Text style={styles.error}>{formik.errors.username}</Text>
        )}
      </View>

      <View style={styles.field}>
        <TextInput
          accessibilityLabel="Password"
          onBlur={formik.handleBlur('password')}
          onChangeText={formik.handleChange('password')}
          placeholder="Password"
          secureTextEntry
          style={[styles.input, passwordHasError && styles.inputError]}
          testID="password-input"
          value={formik.values.password}
        />
        {passwordHasError && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
      </View>

      {submitError && <Text style={styles.submitError}>{submitError}</Text>}

      <Pressable
        accessibilityRole="button"
        disabled={formik.isSubmitting}
        onPress={formik.handleSubmit}
        style={styles.button}
        testID="signin-button"
      >
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
