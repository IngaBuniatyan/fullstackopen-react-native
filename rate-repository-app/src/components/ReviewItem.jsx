import { format } from 'date-fns';
import { Pressable, StyleSheet, View } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
  },
  rating: {
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 22,
    borderWidth: 2,
    height: 44,
    justifyContent: 'center',
    marginRight: 15,
    width: 44,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
  },
  date: {
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: 'white',
  },
});

const ReviewItem = ({ onDelete, onViewRepository, review }) => (
  <View style={styles.container} testID={`review-${review.id}`}>
    <View style={styles.rating}>
      <Text fontWeight="bold" style={styles.ratingText}>
        {review.rating}
      </Text>
    </View>
    <View style={styles.content}>
      <Text fontWeight="bold">
        {review.repository?.fullName ?? review.user.username}
      </Text>
      <Text color="textSecondary" style={styles.date}>
        {format(new Date(review.createdAt), 'd.M.yyyy')}
      </Text>
      {review.text ? <Text>{review.text}</Text> : null}
      {(onDelete || onViewRepository) && (
        <View style={styles.actions}>
          {onViewRepository && (
            <Pressable
              onPress={onViewRepository}
              style={styles.button}
              testID={`view-repository-${review.id}`}
            >
              <Text fontWeight="bold" style={styles.buttonText}>
                View repository
              </Text>
            </Pressable>
          )}
          {onDelete && (
            <Pressable
              onPress={onDelete}
              style={[styles.button, styles.deleteButton]}
              testID={`delete-review-${review.id}`}
            >
              <Text fontWeight="bold" style={styles.buttonText}>
                Delete review
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  </View>
);

export default ReviewItem;
