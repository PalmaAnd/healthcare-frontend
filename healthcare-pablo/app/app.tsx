import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './(tabs)/index';
import LoginScreen from './(tabs)/login';
import RegisterScreen from './register';
import DashboardScreen from './(tabs)/dashboard';
import AppointmentsScreen from './(tabs)/appointments';
import ImpressumScreen from './(tabs)/impressum';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'apps-sharp' : 'apps-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar-sharp' : 'calendar-outline';
          } else if (route.name === 'Records') {
            iconName = focused ? 'document-text-sharp' : 'document-text-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#50B498',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
        headerStyle: {
          backgroundColor: '#468585',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#468585',
          },
          headerShadowVisible: false,
          headerTintColor: '#fff',
        }}
      >
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
            >
              {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerLeft: () => null, // This removes the back button
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Impressum" component={ImpressumScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}