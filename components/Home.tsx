import { Spinner, Box } from "@gluestack-ui/themed";
import { UserInfo } from "../types/user";
import UserInfoView from "./UserInfoView";

type Props = {
  userInfo: UserInfo | null;
};

export default function Home({ userInfo }: Props) {
  return (
    <Box justifyContent="center" alignItems="center" h="100%">
      {userInfo != null ? (
        <UserInfoView userInfo={userInfo} />
      ) : (
        <Spinner size="large" />
      )}
    </Box>
  );
}
