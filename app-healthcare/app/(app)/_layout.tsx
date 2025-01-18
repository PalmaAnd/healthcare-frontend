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
        name="appointments"
        options={{
          title: 'Appointments',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar-sharp' : 'calendar-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'file-tray-full-sharp' : 'file-tray-full-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="impressum"
        options={{
          title: 'Impressum',
          href: null,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle-sharp' : 'information-circle-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: 'Tracker',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'checkbox-sharp' : 'checkbox-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="profile/legal_notice"
        options={{
          title: 'Legal Notice',
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/summary"
        options={{
          title: 'Summary',
          href: null,
        }}
      />
      <Tabs.Screen name="emergency" options={{ title: 'Emergency Information', href: null }} />
      <Tabs.Screen name="insights" options={{ title: 'Health Insights', href: null }} />
      <Tabs.Screen name="documents" options={{ title: 'Document Vault', href: null }} />
      <Tabs.Screen name="medications/index" options={{ title: 'Medications', href: null }} />

    </Tabs>
  );
}