import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';

import theme from '../theme';
import AppBar from './AppBar';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';

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
      <Route element={<SingleRepository />} path="/repositories/:id" />
      <Route element={<SignIn />} path="/signin" />
      <Route element={<SignUp />} path="/signup" />
      <Route element={<CreateReview />} path="/create-review" />
      <Route element={<MyReviews />} path="/my-reviews" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  </View>
);

export default Main;
