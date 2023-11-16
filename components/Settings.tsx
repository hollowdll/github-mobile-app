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
  Box,
} from "@gluestack-ui/themed";
import { StyleSheet, Alert } from "react-native";
import { supabase } from "../supabase/client";
import * as storage from "../storage/storage";
import { useState } from "react";

// Shows basic information about user
export default function Settings() {
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  // Sign out from the current account in the app.
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(`Failed to sign out: ${error}`);

    await storage.deleteEncryptedItem(storage.githubProviderToken);
  }

  return (
    <Box justifyContent="center" alignItems="center" h="100%">
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
    </Box>
  );
}
