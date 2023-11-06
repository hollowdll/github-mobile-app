import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { supabase } from '../supabase/client';
import { Session } from '@supabase/supabase-js';

// Login entry point
export default function Home({ session }: { session: Session }) {
  const [msg, setMsg] = useState("You are logged in");

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.infoText}>{msg}</Text>
      
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