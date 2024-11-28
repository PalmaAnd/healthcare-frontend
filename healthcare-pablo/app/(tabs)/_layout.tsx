import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#50B498',
            headerStyle: {
                  backgroundColor: '#468585',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
            backgroundColor: '#25292e',
            },
          }}
        >
      <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                ),
              }}
            />
      <Tabs.Screen
            name="register"
            options={{
                title: 'Registration',
                tabBarIcon:({color, focused}) => (
                    <Ionicons name={focused ? 'log-in-sharp': 'log-in-outline'} color={color} size={24}/>
                )
            }}
        />
      <Tabs.Screen
            name="login"
            options={{
                title: 'Login',
                tabBarIcon:({color, focused}) => (
                    <Ionicons name={focused ? 'log-in-sharp': 'log-in-outline'} color={color} size={24}/>
                )

            }}
        />
      <Tabs.Screen
            name="impressum"
            options={{
                title: 'Impressum',
                tabBarIcon: ({ color, focused }) => (
                     <Ionicons name={focused ? 'information-circle-sharp': 'information-circle-outline'} color={color} size={24} />
                )
            }}
        />
      <Tabs.Screen
            name="appointments"
            options={{
                title: 'Appointments',
                 tabBarIcon: ({ color, focused }) => (
                      <Ionicons name={focused ? 'calendar-sharp': 'calendar-outline'} color={color} size={24} />
                 )
            }}
        />
    </Tabs>
  );
}