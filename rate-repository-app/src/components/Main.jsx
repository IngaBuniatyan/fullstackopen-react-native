import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';

import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => (
  <View style={styles.container}>
    <AppBar />
    <Routes>
      <Route element={<RepositoryList />} path="/" />
      <Route element={<SignIn />} path="/signin" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  </View>
);

export default Main;
