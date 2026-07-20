import Constants from 'expo-constants';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';

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

const AppBarTab = ({ children, to }) => (
  <Pressable>
    <Link to={to} underlayColor="transparent">
      <View style={styles.tab}>
        <Text fontWeight="bold" style={styles.tabText}>
          {children}
        </Text>
      </View>
    </Link>
  </Pressable>
);

const AppBar = () => (
  <View style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.tabs}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <AppBarTab to="/">Repositories</AppBarTab>
      <AppBarTab to="/signin">Sign in</AppBarTab>
    </ScrollView>
  </View>
);

export default AppBar;
