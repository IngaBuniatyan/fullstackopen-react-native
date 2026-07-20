import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';

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
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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

      <Pressable
        accessibilityRole="button"
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
