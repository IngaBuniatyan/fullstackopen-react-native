import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    backgroundColor: 'white',
    padding: 15,
  },
  searchInput: {
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    borderWidth: 1,
    fontFamily: theme.fonts.main,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sortingOptions: {
    gap: 8,
  },
  sortingButton: {
    borderColor: theme.colors.primary,
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
  },
  sortingButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  sortingTextSelected: {
    color: 'white',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderingOptions = [
  {
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    testID: 'sort-latest',
  },
  {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
    testID: 'sort-highest',
  },
  {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
    testID: 'sort-lowest',
  },
];

const RepositoryListHeader = ({
  onOrderChange,
  onSearchKeywordChange,
  searchKeyword,
  selectedOrder,
}) => (
  <View style={styles.header}>
    <TextInput
      accessibilityLabel="Search repositories"
      onChangeText={onSearchKeywordChange}
      placeholder="Search repositories"
      style={styles.searchInput}
      testID="repository-search-input"
      value={searchKeyword}
    />
    <View style={styles.sortingOptions}>
      {orderingOptions.map((option) => {
        const isSelected = selectedOrder.label === option.label;

        return (
          <Pressable
            key={option.label}
            onPress={() => onOrderChange(option)}
            style={[
              styles.sortingButton,
              isSelected && styles.sortingButtonSelected,
            ]}
            testID={option.testID}
          >
            <Text style={isSelected && styles.sortingTextSelected}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  </View>
);

export const RepositoryListContainer = ({
  onOrderChange,
  onRepositoryPress,
  onSearchKeywordChange,
  repositoryNodes,
  searchKeyword,
  selectedOrder,
}) => {
  const hasHeader = Boolean(
    onOrderChange && onSearchKeywordChange && selectedOrder,
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={
        hasHeader ? (
          <RepositoryListHeader
            onOrderChange={onOrderChange}
            onSearchKeywordChange={onSearchKeywordChange}
            searchKeyword={searchKeyword}
            selectedOrder={selectedOrder}
          />
        ) : null
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onRepositoryPress?.(item.id)}
          testID={`repository-link-${item.id}`}
        >
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      testID="repository-list"
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(orderingOptions[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();
  const { repositories } = useRepositories({
    orderBy: selectedOrder.orderBy,
    orderDirection: selectedOrder.orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });
  const repositoryNodes =
    repositories?.edges?.map(({ node }) => node) ?? [];

  return (
    <RepositoryListContainer
      onOrderChange={setSelectedOrder}
      onRepositoryPress={(id) => navigate(`/repositories/${id}`)}
      onSearchKeywordChange={setSearchKeyword}
      repositoryNodes={repositoryNodes}
      searchKeyword={searchKeyword}
      selectedOrder={selectedOrder}
    />
  );
};

export default RepositoryList;
