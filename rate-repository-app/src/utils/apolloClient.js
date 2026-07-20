import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

const apolloUri = process.env.EXPO_PUBLIC_APOLLO_URI;

if (!apolloUri) {
  throw new Error('EXPO_PUBLIC_APOLLO_URI is not configured');
}

const httpLink = new HttpLink({
  uri: apolloUri,
});

const createApolloClient = (authStorage) => {
  const authLink = new SetContextLink(async (previousContext) => {
    const accessToken = await authStorage.getAccessToken();

    return {
      headers: {
        ...previousContext.headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

export default createApolloClient;
