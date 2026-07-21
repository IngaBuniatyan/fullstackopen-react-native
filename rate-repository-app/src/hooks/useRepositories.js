import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    repositories: data?.repositories,
    error,
    loading,
    refetch,
  };
};

export default useRepositories;
