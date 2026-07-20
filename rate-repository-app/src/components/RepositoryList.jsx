import { FlatList, StyleSheet, View } from 'react-native';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositoryNodes }) => (
  <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    keyExtractor={({ id }) => id}
    renderItem={({ item }) => <RepositoryItem repository={item} />}
    testID="repository-list"
  />
);

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const repositoryNodes =
    repositories?.edges?.map(({ node }) => node) ?? [];

  return <RepositoryListContainer repositoryNodes={repositoryNodes} />;
};

export default RepositoryList;
