import { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useAuthStorage = () => {
  const authStorage = useContext(AuthStorageContext);

  if (!authStorage) {
    throw new Error('AuthStorageContext provider is missing');
  }

  return authStorage;
};

export default useAuthStorage;
