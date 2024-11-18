import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="register" options={{ title: 'Registration' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
    </Stack>
  );
}