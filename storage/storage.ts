// https://docs.expo.dev/versions/latest/sdk/securestore/
import * as SecureStore from 'expo-secure-store';

export const githubProviderToken = 'gh-provider-token'

/**
 * Store key-value pair to persistent secure storage.
 * 
 * @param key Key that the stored value uses
 * @param value Value to store
 */
export const storeItemEncrypted = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Failed to store item to SecureStorage:", error)
  }
}

/**
 * Get value from persistent secure storage using key.
 * 
 * @param key The key the value is stored to.
 * @returns The value if it exists. Otherwise undefined.
 */
export const getEncryptedItem = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.error("Failed to get item from SecureStorage:", error);
  }
}

/**
 * Delete value from persistent secure storage using key.
 * 
 * @param key The key the value is stored to.
 */
export const deleteEncryptedItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Failed to delete item from SecureStorage:", error);
  }
}