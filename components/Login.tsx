// Some code is based on this
// https://supabase.com/docs/guides/auth/native-mobile-deep-linking

import { StyleSheet, Alert } from "react-native";
import { Button, Text } from "@rneui/themed";
import GitHubIcon from "../assets/mark-github.svg";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { supabase } from "../supabase/client";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as storage from "../storage/storage";
import { Box } from "@gluestack-ui/themed";
import { UserInfo } from "../types/user";

const redirectTo = makeRedirectUri();

type Props = {
  updateUser: (user: UserInfo | null) => void,
}

export default function Login({ updateUser }: Props) {
  // Extracts tokens in url and creates session.
  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token, provider_token } = params;

    if (!access_token) return;
    await storage.storeItemEncrypted(
      storage.githubProviderToken,
      provider_token
    );

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;

    return data.session;
  };

  // OAuth sign in process.
  // Opens web browser where user can sign in.
  // Redirects back to the app.
  const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "read:user",
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
      console.log("success bro!");

      await createSessionFromUrl(url);
    }
  };

  const signIn = async () => {
    try {
      await performOAuth();
    } catch (_) {
      Alert.alert("Something went wrong and login process failed!");
    }
  };

  return (
    <Box justifyContent="center" alignItems="center" h="100%">
      <GitHubIcon style={{ marginBottom: 20 }} width={64} height={64} />
      <Text style={styles.infoText}>
        You need a GitHub account to use this app
      </Text>
      <Button
        title="Continue with GitHub"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={signIn}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
