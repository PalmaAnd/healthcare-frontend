import React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from './auth/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
