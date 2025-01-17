import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      // Add a small delay to prevent flash of loading screen
      setTimeout(() => {
        if (userToken) {
          router.replace('/(app)');
        } else {
          router.replace('/(auth)/login');
        }
      }, 1000);
    } catch (error) {
      console.error('Error checking auth state:', error);
      router.replace('/(auth)/login');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#50B498" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
