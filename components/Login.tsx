// Some code is based on this
// https://supabase.com/docs/guides/auth/native-mobile-deep-linking

import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from '@rneui/themed';
import GitHubIcon from '../assets/mark-github.svg';
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { supabase } from '../supabase/client';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from "expo-web-browser";

const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;

  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      scopes: '',
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    console.log("success bro!")

    await createSessionFromUrl(url);
  }
};

// OAuth login entry point
export default function Login() {
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
        onPress={performOAuth}
        // disabled={!request}
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