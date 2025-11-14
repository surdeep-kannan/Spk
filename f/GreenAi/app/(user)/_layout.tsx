// app/(user)/driver/_layout.tsx (Driver App Layout)

import { Stack } from 'expo-router';
import React from 'react';

export default function DriverLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true, 
      headerStyle: { backgroundColor: '#1A4D2E' }, // Eco Green theme
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
      {/* Driver Dashboard */}
      <Stack.Screen name="index" options={{ title: 'Driver Dashboard' }} /> 
      
      {/* Route Input Screen */}
      <Stack.Screen name="route-input" options={{ title: 'Plan Route' }} />
      
      {/* Navigation Screen */}
      <Stack.Screen name="navigation" options={{ title: 'Live Navigation' }} />
      
      {/* Trip Summary Screen */}
      <Stack.Screen name="trip-summary" options={{ title: 'Trip Summary' }} />
      
      {/* ✅ ADDED: History Screen */}
      <Stack.Screen name="history" options={{ title: 'Trip History' }} />
    </Stack>
  );
}