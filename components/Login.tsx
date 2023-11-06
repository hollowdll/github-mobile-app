import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from '@rneui/themed';
import GitHubIcon from '../assets/mark-github.svg';
import { supabase } from '../supabase/client';
import * as AuthSession from 'expo-auth-session';
import { useEffect } from 'react';

const githubClientId = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID as string;
const redirectUri = AuthSession.makeRedirectUri();

// https://docs.expo.dev/guides/authentication/#github
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${githubClientId}`,
};

// OAuth login entry point
export default function Login() {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: githubClientId,
      scopes: [],
      redirectUri: redirectUri
    },
    discovery
  );
  
  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      signIn(code);
    }
  }, [response]);

  // Sign in by exchanging code for session
  async function signIn(code: string) {
    // const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}`;

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) Alert.alert(`Login failed: ${error.message}`)
    console.log(data.user?.id);
  }

  return (
    <View style={styles.loginContainer}>
      <GitHubIcon style={{ marginBottom: 20 }} width={64} height={64} />
      <Text style={styles.infoText}>You need a GitHub account to use this app</Text>
      <Button
        title="Continue with GitHub"
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold' }}
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
})