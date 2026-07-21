import { render, screen, within } from '@testing-library/react-native';

import { RepositoryListContainer } from './RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor:
            'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor:
              'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      const repositoryNodes = repositories.edges.map(({ node }) => node);

      await render(
        <RepositoryListContainer repositoryNodes={repositoryNodes} />,
      );

      const [firstRepository, secondRepository] =
        screen.getAllByTestId('repositoryItem');

      const first = within(firstRepository);
      const second = within(secondRepository);

      expect(first.getByText('jaredpalmer/formik')).toBeOnTheScreen();
      expect(
        first.getByText('Build forms in React, without the tears'),
      ).toBeOnTheScreen();
      expect(first.getByText('TypeScript')).toBeOnTheScreen();
      expect(first.getByText('1.6k')).toBeOnTheScreen();
      expect(first.getByText('21.9k')).toBeOnTheScreen();
      expect(first.getByText('88')).toBeOnTheScreen();
      expect(first.getByText('3')).toBeOnTheScreen();

      expect(second.getByText('async-library/react-async')).toBeOnTheScreen();
      expect(
        second.getByText('Flexible promise-based React data loader'),
      ).toBeOnTheScreen();
      expect(second.getByText('JavaScript')).toBeOnTheScreen();
      expect(second.getByText('69')).toBeOnTheScreen();
      expect(second.getByText('1.8k')).toBeOnTheScreen();
      expect(second.getByText('72')).toBeOnTheScreen();
      expect(second.getByText('3')).toBeOnTheScreen();

      expect(first.getByText('Stars')).toBeOnTheScreen();
      expect(second.getByText('Forks')).toBeOnTheScreen();
    });
  });
});
