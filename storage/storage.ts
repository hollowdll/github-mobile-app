import AsyncStorage from '@react-native-async-storage/async-storage';

export const githubProviderToken = 'gh-provider-token'

/**
 * Store key-value pair to persistent storage.
 * 
 * @param key Key that the stored value uses
 * @param value Value to store
 */
export const storeItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Failed to store item to AsyncStorage:", error)
  }
}

/**
 * Get value from persistent storage using key.
 * 
 * @param key The key the value is stored to.
 * @returns The value if it exists. Otherwise undefined.
 */
export const getItem = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.error("Failed to get item from AsycStorage:", error);
    }
}