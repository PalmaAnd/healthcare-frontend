import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function AuthLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#50B498',
                tabBarInactiveTintColor: '#718096',
                headerStyle: {
                    backgroundColor: '#468585',
                  },
                  headerShadowVisible: false,
                  headerTintColor: '#fff',
                  tabBarStyle: {
                    backgroundColor: '#25292e',
                  },
            }}>
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Login',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="sign-in" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: 'Register',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user-plus" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}