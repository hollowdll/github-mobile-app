import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase/client";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from "./components/Login";
import Home from "./components/Home";
import Settings from "./components/Settings";
import RepositoryList from './components/RepositoryList';
import { UserInfo } from './types/user';
import { getUserInfo } from './api/api';

const Drawer = createDrawerNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const updateUser = (user: UserInfo | null) => {
    setUserInfo(user);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session !== null) {
        try {
          const userInfo = await getUserInfo();
          updateUser(userInfo);
        } catch(error) {
          console.error(error);
          Alert.alert("Failed to get user data");
        }
      }
    });
  }, []);

  return (
    <GluestackUIProvider config={config}>
      {session && session.user ? (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home">
              {(props) => <Home key={session.user.id} session={session} userInfo={userInfo} />}
            </Drawer.Screen>
            <Drawer.Screen name="Repositories" component={RepositoryList} />
            <Drawer.Screen name="Settings" component={Settings} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <Login updateUser={updateUser} />
      )}
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
