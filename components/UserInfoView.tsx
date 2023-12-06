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
import { convertToLocaleDateString } from "../utility/date";

type Props = {
  userInfo: UserInfo;
};

// Shows basic information about user
export default function UserInfoView({ userInfo }: Props) {
  return (
    <Box justifyContent="center" alignItems="center">
      <Avatar size="xl">
        <AvatarFallbackText></AvatarFallbackText>
        <AvatarImage
          source={{
            uri: userInfo.avatarUrl,
          }}
        />
      </Avatar>
      <Heading size="2xl" style={{ marginBottom: 10 }}>Hello 👋, {userInfo.login}</Heading>
      <Text style={styles.info}>Name: {userInfo.name}</Text>
      <Text style={styles.info}>GitHub ID: {userInfo.id}</Text>
      <Text style={styles.info}>Joined: { convertToLocaleDateString(userInfo.createdAt) }</Text>
      <Text style={styles.info}>Followers: {userInfo.followers}</Text>
      <Text style={styles.info}>Following: {userInfo.following}</Text>
      <Text style={styles.info}>Public repos: {userInfo.publicRepos}</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  info: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
  },
});
