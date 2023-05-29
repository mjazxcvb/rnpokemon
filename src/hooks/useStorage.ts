import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleError} from '../utils';

const useStorage = () => {
  const setItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      handleError(e);
    }
  };

  const getItem = async (key: string, def: any) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : def;
    } catch (e) {
      handleError(e);
    }
  };

  const removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      handleError(e);
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};

export default useStorage;
