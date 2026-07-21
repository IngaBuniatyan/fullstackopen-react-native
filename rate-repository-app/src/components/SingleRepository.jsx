import { useQuery } from '@apollo/client/react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';

import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
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

const SingleRepository = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading && !data) {
    return <Text style={styles.message}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.message}>{error.message}</Text>;
  }

  const repository = data?.repository;

  if (!repository) {
    return <Text style={styles.message}>Repository not found</Text>;
  }

  const reviews = repository.reviews.edges.map(({ node }) => node);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={({ id: reviewId }) => reviewId}
      ListHeaderComponent={
        <>
          <RepositoryItem repository={repository} showGitHubButton />
          {reviews.length > 0 && <View style={styles.separator} />}
        </>
      }
      renderItem={({ item }) => <ReviewItem review={item} />}
      testID="single-repository"
    />
  );
};

export default SingleRepository;
