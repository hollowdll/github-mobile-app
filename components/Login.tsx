import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/themed';
import GitHubIcon from '../assets/mark-github.svg';
import { supabase } from '../supabase/client';

// Login entry point
export default function Login() {
  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }

  return (
    <View style={styles.loginContainer}>
      <GitHubIcon style={{ marginBottom: 20 }} width={64} height={64} />
      <Text style={styles.infoText}>You need a GitHub account to use this app</Text>
      <Button
        title="Continue with GitHub"
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold' }}
        onPress={signInWithGithub}
      />
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