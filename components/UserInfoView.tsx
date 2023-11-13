import {
  Text,
  Center,
  Heading,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { UserInfo } from "../types/user";
import { StyleSheet } from "react-native";

type Props = {
  userInfo: UserInfo;
};

// Shows basic information about user
export default function UserInfoView({ userInfo }: Props) {
  return (
    <Center h={"$80"}>
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
    </Center>
  );
}

const styles = StyleSheet.create({
  info: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
