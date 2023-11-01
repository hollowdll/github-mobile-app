import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/themed';

// Login entry point
// TODO: functionality
export default function Login() {
  return (
    <View style={styles.loginContainer}>
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