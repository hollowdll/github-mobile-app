import { useState } from "react";
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
  ButtonIcon,
  CloseIcon,
} from "@gluestack-ui/themed";

export default function Home({ session }: { session: Session }) {
  const [msg, setMsg] = useState("You are logged in");
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  // Sign out from the current account in the app.
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(`Failed to sign out: ${error}`);
  }

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.infoText}>{msg}</Text>
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
