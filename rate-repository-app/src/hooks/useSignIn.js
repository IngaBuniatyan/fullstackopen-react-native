import { useApolloClient, useMutation } from '@apollo/client/react';

import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
    const accessToken = response.data?.authenticate?.accessToken;

    if (!accessToken) {
      throw new Error('Authentication did not return an access token');
    }

    await authStorage.setAccessToken(accessToken);
    await apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
