// app/(user)/driver/_layout.tsx (Driver App Layout with Sidebar)

import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'; 
// Path to the i18n configuration file
import '../../../i18n/i18n'; 

export default function DriverLayout() {
  const { t } = useTranslation(); 

  return (
    <Drawer
      screenOptions={{ 
        headerShown: true, 
        headerStyle: { backgroundColor: '#1A4D2E' }, 
        headerTintColor: '#FFFFFF',
        drawerActiveTintColor: '#1A4D2E', 
        drawerInactiveTintColor: '#333333',
      }}
    >
      {/* 1. Dashboard */}
      <Drawer.Screen 
        name="index" 
        options={{ 
          title: t('dashboard_title'), 
          drawerLabel: t('dashboard_title'),
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }} 
      />
      
      {/* 2. Route Input Screen */}
      <Drawer.Screen 
        name="route-input" 
        options={{ 
          title: t('route_input'),
          drawerLabel: t('route_input'),
          drawerIcon: ({ color, size }) => <Ionicons name="location" size={size} color={color} />,
        }} 
      />
      
      {/* 3. Trip History Screen */}
      <Drawer.Screen 
        name="history" 
        options={{ 
          title: t('trip_history'),
          drawerLabel: t('trip_history'),
          drawerIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} />,
        }} 
      />
      
      {/* 4. Live Navigation Screen (Hidden in sidebar) */}
      <Drawer.Screen 
        name="navigation" 
        options={{ 
          title: 'Live Navigation',
          drawerLabel: () => null, 
          headerShown: false, 
        }} 
      />
      
      {/* 5. Trip Summary Screen (Hidden in sidebar) */}
      <Drawer.Screen 
        name="trip-summary" 
        options={{ 
          title: 'Trip Summary',
          drawerLabel: () => null, 
        }} 
      />

    </Drawer>
  );
}