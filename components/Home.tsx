import { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { Session } from "@supabase/supabase-js";
import {
  Text,
  Spinner,
  Box,
} from "@gluestack-ui/themed";
import { UserInfo } from "../types/user";
import UserInfoView from "./UserInfoView";

type Props = {
  session: Session,
  userInfo: UserInfo | null,
}

export default function Home({ session, userInfo }: Props) {
  const [errorMsg, setErrorMsg] = useState('');

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
