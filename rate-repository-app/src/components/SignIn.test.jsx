import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import { SignInContainer } from './SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit with correct values when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      await render(<SignInContainer onSubmit={onSubmit} />);

      await fireEvent.changeText(
        screen.getByPlaceholderText('Username'),
        'kalle',
      );
      await fireEvent.changeText(
        screen.getByPlaceholderText('Password'),
        'password',
      );
      await fireEvent.press(screen.getByTestId('signin-button'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
