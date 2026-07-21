import { useMutation, useQuery } from '@apollo/client/react';
import { Alert, FlatList, Platform, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';

import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  message: {
    padding: 15,
  },
});

const confirmDeletion = (callback) => {
  if (Platform.OS === 'web') {
    if (globalThis.confirm('Delete review?')) {
      callback();
    }
    return;
  }

  Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: callback },
  ]);
};

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, error, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const reviews = data?.me?.reviews?.edges.map(({ node }) => node) ?? [];

  const handleDelete = (id) => {
    confirmDeletion(async () => {
      await deleteReview({ variables: { id } });
      await refetch();
    });
  };

  if (loading && !data) {
    return <Text style={styles.message}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.message}>{error.message}</Text>;
  }

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={<Text style={styles.message}>No reviews yet</Text>}
      renderItem={({ item }) => (
        <ReviewItem
          onDelete={() => handleDelete(item.id)}
          onViewRepository={() =>
            navigate(`/repositories/${item.repositoryId}`)
          }
          review={item}
        />
      )}
      testID="my-reviews"
    />
  );
};

export default MyReviews;
