import { Image, StyleSheet, View } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  details: {
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 4,
    height: 50,
    marginRight: 15,
    width: 50,
  },
  information: {
    alignItems: 'flex-start',
    flex: 1,
  },
  description: {
    marginTop: 4,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    color: 'white',
    marginTop: 8,
    overflow: 'hidden',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  statistic: {
    alignItems: 'center',
  },
});

const formatCount = (count) =>
  count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);

const Statistic = ({ count, label }) => (
  <View style={styles.statistic}>
    <Text fontWeight="bold">{formatCount(count)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ repository }) => (
  <View style={styles.container} testID={`repository-${repository.id}`}>
    <View style={styles.details}>
      <Image
        accessibilityLabel={`${repository.fullName} avatar`}
        source={{ uri: repository.ownerAvatarUrl }}
        style={styles.avatar}
        testID={`avatar-${repository.id}`}
      />
      <View style={styles.information}>
        <Text fontSize="subheading" fontWeight="bold">
          {repository.fullName}
        </Text>
        <Text color="textSecondary" style={styles.description}>
          {repository.description}
        </Text>
        <Text style={styles.language}>{repository.language}</Text>
      </View>
    </View>

    <View style={styles.statistics}>
      <Statistic count={repository.stargazersCount} label="Stars" />
      <Statistic count={repository.forksCount} label="Forks" />
      <Statistic count={repository.reviewCount} label="Reviews" />
      <Statistic count={repository.ratingAverage} label="Rating" />
    </View>
  </View>
);

export default RepositoryItem;
