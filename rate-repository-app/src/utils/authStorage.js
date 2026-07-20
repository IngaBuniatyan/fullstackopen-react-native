import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  get accessTokenKey() {
    return `${this.namespace}:accessToken`;
  }

  getAccessToken() {
    return AsyncStorage.getItem(this.accessTokenKey);
  }

  setAccessToken(accessToken) {
    return AsyncStorage.setItem(this.accessTokenKey, accessToken);
  }

  removeAccessToken() {
    return AsyncStorage.removeItem(this.accessTokenKey);
  }
}

export default AuthStorage;
