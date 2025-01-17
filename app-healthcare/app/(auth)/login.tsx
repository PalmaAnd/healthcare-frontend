import React from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Provider as PaperProvider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Add your login logic here
    router.replace('/(app)');
  };
  const handleForgotPassword = () => {
    //Add forgot password logic here
    router.replace('/(auth)/register');
    }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
            <Text style={[styles.title, { fontSize: 36, color: 'black' }]}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Log in to your account to continue</Text>
          <TextInput
            label="Username"
            mode="flat"
            style={styles.input}
            theme={{
              colors: {
                primary: '#50B498',
                background: '#fff',
              },
            }}
          />
          <TextInput
            label="Password"
            mode="flat"
            secureTextEntry
            style={styles.input}
            theme={{
              colors: {
                primary: '#50B498',
                background: '#fff',
              },
            }}
          />
            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                labelStyle={[styles.buttonText, { color: '#FFFFFF' }]} // Setzt die Schriftfarbe explizit auf Weiß
                >
                Login
            </Button>
            <Button
            mode="text"
            onPress={() => {handleForgotPassword()}}
            style={styles.forgotPassword}
            labelStyle={{ color: '#50B498', fontSize: 14 }}
          >
            Forgot Password?
          </Button>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={{ color: '#50B498', fontWeight: 'bold' }}>Sign Up</Text>
          </Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 8, // Runde Ecken
    elevation: 2, // Schatten für Android
    shadowColor: '#000', // Schatten für iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#fff', // Heller Hintergrund
  },
  button: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#50B498',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  forgotPassword: {
    marginTop: 15,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
});
