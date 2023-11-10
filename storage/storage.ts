import AsyncStorage from '@react-native-async-storage/async-storage';

const githubProviderToken = 'gh-provider-token'

export const storeProviderToken = async (value: string) => {
  try {
    await AsyncStorage.setItem(githubProviderToken, value);
  } catch (error) {
    console.error("Failed to store provider token:", error)
  }
}

export const getProviderToken = async () => {
    try {
        const value = await AsyncStorage.getItem(githubProviderToken);
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.error("Failed to get provider token:", error);
    }
}