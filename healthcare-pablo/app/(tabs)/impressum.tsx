import { Text, View, StyleSheet } from 'react-native';
 import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/" style={styles.button}>
        Go back to Index screen
      </Link>
      <Link href="/login" style={styles.button}>
        Go to Login screen
      </Link>
      <Link href="/register" style={styles.button}>
          Go to Register screen
      </Link>
      <Link href="/appointments" style={styles.button}>
            Go to Appointment screen
      </Link>
      <Link href="/dashboard" style={styles.button}>
          Go to Dashboard screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});