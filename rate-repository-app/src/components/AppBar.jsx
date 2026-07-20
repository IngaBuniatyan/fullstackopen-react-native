import { useApolloClient, useQuery } from '@apollo/client/react';
import Constants from 'expo-constants';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBarBackground,
    paddingTop: Constants.statusBarHeight,
  },
  tabs: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tabText: {
    color: theme.colors.appBarText,
  },
});

const AppBarTabText = ({ children }) => (
  <Text fontWeight="bold" style={styles.tabText}>
    {children}
  </Text>
);

const AppBarTab = ({ children, onPress, testID, to }) =>
  to ? (
    <Pressable>
      <Link
        style={styles.tab}
        testID={testID}
        to={to}
        underlayColor="transparent"
      >
        <AppBarTabText>{children}</AppBarTabText>
      </Link>
    </Pressable>
  ) : (
    <Pressable onPress={onPress} style={styles.tab} testID={testID}>
      <AppBarTabText>{children}</AppBarTabText>
    </Pressable>
  );

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <AppBarTab testID="repositories-tab" to="/">
          Repositories
        </AppBarTab>
        {data?.me ? (
          <AppBarTab onPress={handleSignOut} testID="signout-tab">
            Sign out
          </AppBarTab>
        ) : (
          <AppBarTab testID="signin-tab" to="/signin">
            Sign in
          </AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
