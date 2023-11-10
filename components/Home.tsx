import { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabase/client";
import { Session } from "@supabase/supabase-js";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Heading,
  AlertDialogCloseButton,
  Icon,
  AlertDialogBody,
  Text,
  ButtonGroup,
  Button,
  ButtonText,
  CloseIcon,
} from "@gluestack-ui/themed";
import { UserInfo } from "../types/user";
import { GITHUB_API_URL, GITHUB_API_VERSION } from "../config/config";
import axios from "axios";
import { Octokit } from "@octokit/core";
import { getProviderToken } from "../storage/storage";

export default function Home({ session }: { session: Session }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [msg, setMsg] = useState("You are logged in");
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Sign out from the current account in the app.
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(`Failed to sign out: ${error}`);
  }

  /*
  const getUserInfo = () => {
    axios.get(`${GITHUB_API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${session.provider_token ?? ''}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Accept': 'application/vnd.github+json'
      }
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error);
      setErrorMsg('Failed to load user info');
    })
  }*/

  const getUserInfo = async () => {
    const providerToken = await getProviderToken();
    if (providerToken === undefined) {
      return setErrorMsg('Failed to get provider token');
    }

    const octokit = new Octokit({
      auth: providerToken
    })
    
    try {
      const response = await octokit.request('GET /user', {
        headers: {
          'X-GitHub-Api-Version': GITHUB_API_VERSION
        }
      });

      console.log(response);
    } catch(err) {
      console.error(err);
      setErrorMsg('Failed to load user info');
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.homeContainer}>
      <Text>{ errorMsg }</Text>
      <Text style={styles.infoText}>{ msg }</Text>
      <Button
        action="negative"
        onPress={() => setShowSignOutDialog(true)}
      >
        <ButtonText>Sign Out</ButtonText>
      </Button>
      <AlertDialog
        isOpen={showSignOutDialog}
        onClose={() => setShowSignOutDialog(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Sign Out</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Sign out from this account? Your session will end and you will be
              forwarded to the login screen.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => setShowSignOutDialog(false)}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button bg="$error600" action="negative" onPress={signOut}>
                <ButtonText>Sign Out</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flexDirection: "column",
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
