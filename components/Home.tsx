import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { supabase } from '../supabase/client';
import { Session } from '@supabase/supabase-js';

// Login entry point
export default function Home({ session }: { session: Session }) {
  const [msg, setMsg] = useState("You are logged in");

  async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) Alert.alert(`Failed to sign out: ${error}`);
  }

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.infoText}>{msg}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
})