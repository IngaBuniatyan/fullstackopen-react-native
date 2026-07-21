import { StyleSheet, TextInput, View } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
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
});

const FormikTextInput = ({ formik, name, style, ...props }) => {
  const hasError = Boolean(formik.touched[name] && formik.errors[name]);

  return (
    <View style={styles.container}>
      <TextInput
        onBlur={formik.handleBlur(name)}
        onChangeText={formik.handleChange(name)}
        style={[styles.input, hasError && styles.inputError, style]}
        value={formik.values[name]}
        {...props}
      />
      {hasError && <Text style={styles.error}>{formik.errors[name]}</Text>}
    </View>
  );
};

export default FormikTextInput;
