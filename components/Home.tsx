import { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
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
  Spinner,
  Box,
} from "@gluestack-ui/themed";
import { UserInfo } from "../types/user";
import { GITHUB_API_VERSION } from "../utility/const"
import { Octokit } from "@octokit/core";
import * as storage from "../storage/storage";
import UserInfoView from "./UserInfoView";

export default function Home({ session }: { session: Session }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [msg, setMsg] = useState("You are logged in");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Send GET request to GitHub API to get user info.
  const getUserInfo = async () => {
    const providerToken = await storage.getEncryptedItem(storage.githubProviderToken);
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

      setUserInfo({
        id: response.data.id,
        login: response.data.login,
        avatarUrl: response.data.avatar_url,
        createdAt: new Date(response.data.created_at),
      });

    } catch(err) {
      console.error(err);
      setErrorMsg('Failed to load user info');
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      h="100%"
    >
      <Text>{ errorMsg }</Text>
      { userInfo != null ? <UserInfoView userInfo={userInfo} /> : <Spinner size="large" /> }
    </Box>
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
    fontSize: 20,
  },
});
