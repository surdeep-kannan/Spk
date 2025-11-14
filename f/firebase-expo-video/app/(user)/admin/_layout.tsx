// app/(user)/admin/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true, 
      headerStyle: { backgroundColor: '#333333' }, // Admin theme color
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
      {/* 1. Admin Dashboard (Main Entry Screen) */}
      <Stack.Screen name="index" options={{ title: 'Admin Dashboard' }} /> 
      
      {/* 2. Management Screens */}
      <Stack.Screen name="user-management" options={{ title: 'Manage Users' }} />
      <Stack.Screen name="vehicle-management" options={{ title: 'Manage Vehicles' }} />
      
      {/* 3. Analytics and Leaderboard Screens */}
      <Stack.Screen name="data-analytics" options={{ title: 'Fleet Analytics' }} />
      <Stack.Screen name="leaderboard" options={{ title: 'Eco Leaderboard' }} />

      {/* 4. Modals (User Interaction) */}
      <Stack.Screen 
        name="create-user-modal" 
        options={{ title: 'Add New User', presentation: 'modal' }} 
      />
      <Stack.Screen 
        name="edit-user-modal" 
        options={{ title: 'Edit User Role', presentation: 'modal' }} 
      />
      <Stack.Screen 
        name="create-vehicle-modal" 
        options={{ title: 'Add New Vehicle', presentation: 'modal' }} 
      />
      
    </Stack>
  );
}