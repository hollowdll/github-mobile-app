import {
  Text,
  Center,
  Heading,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
} from "@gluestack-ui/themed";
import { UserInfo } from "../types/user";
import { StyleSheet } from "react-native";

type Props = {
  userInfo: UserInfo;
};

// Shows basic information about user
export default function UserInfoView({ userInfo }: Props) {
  const convertToLocaleDateString = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    return date.toLocaleDateString('en', options);
  }

  return (
    <Box justifyContent="center" alignItems="center">
      <Avatar size="xl">
        <AvatarFallbackText>Avatar</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: userInfo.avatarUrl,
          }}
        />
      </Avatar>
      <Heading size="xl">Hello 👋, {userInfo.login}</Heading>
      <Text style={styles.info}>Your GitHub ID is {userInfo.id}</Text>
      <Text style={styles.info}>Joined: { convertToLocaleDateString(userInfo.createdAt) }</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  info: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
