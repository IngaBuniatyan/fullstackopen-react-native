import { Pressable, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 12,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: 'white',
  },
});

const FormButton = ({ disabled, label, onPress, testID }) => (
  <Pressable
    accessibilityRole="button"
    disabled={disabled}
    onPress={onPress}
    style={[styles.button, disabled && styles.disabled]}
    testID={testID}
  >
    <Text fontWeight="bold" style={styles.text}>
      {label}
    </Text>
  </Pressable>
);

export default FormButton;
