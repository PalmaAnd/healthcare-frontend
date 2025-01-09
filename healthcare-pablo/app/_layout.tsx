import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ActivityIndicator, View } from 'react-native';


export default function RootLayout() {
  return (
    <AuthProvider>
      <InnerLayout />
    </AuthProvider>
  );
}

function InnerLayout() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#50B498" />
      </View>
    );
  }

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
      {token ? (
        <>
          <Tabs.Screen
            name="(auth)/dashboard"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'apps-sharp' : 'apps-outline'} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="(auth)/appointments"
            options={{
              title: 'Appointments',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'calendar-sharp' : 'calendar-outline'} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="(auth)/archive"
            options={{
              title: 'Archive',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'file-tray-full-sharp' : 'file-tray-full-outline'} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="(auth)/doctors-note"
            options={{
              title: 'Doctors Note',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'document-text-sharp' : 'document-text-outline'} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="impressum"
            options={{
              title: 'Impressum',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle-sharp' : 'information-circle-outline'} color={color} size={24} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tabs.Screen
            name="(public)/index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="(public)/login"
            options={{
              title: 'Login',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'log-in-sharp' : 'log-in-outline'} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="(public)/register"
            options={{
              title: 'Register',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'person-add-sharp' : 'person-add-outline'} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="impressum"
            options={{
              title: 'Impressum',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'information-circle-sharp' : 'information-circle-outline'} color={color} size={24} />
              ),
            }}
          />
        </>
      )}
    </Tabs>
  );
}