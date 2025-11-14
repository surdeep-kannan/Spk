// app/_layout.tsx

// ✅ FIX: Added useSegments to the import list
import { Stack, Redirect, useRouter, useSegments } from "expo-router"; 
import { AuthProvider, useAuth } from "../app/context/AuthContext"; 
import "../FirebaseConfig"; 
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

function RootGuard() {
    // --- TEMPORARY Placeholder for Auth State (REPLACE WITH useAuth() WHEN READY) ---
    // Since you are debugging the final router structure, we will use the actual useAuth hook
    // assuming you have placed the AuthProvider around the RootGuard.
    const { user, role, status, loading } = useAuth(); // Assuming this is now active
    const segments = useSegments();

    if (loading) {
        return (
             <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1A4D2E" />
                <Text style={{ marginTop: 10 }}>Checking Session and Role...</Text>
            </View>
        );
    }
    
    const currentSegment = segments[0];

    const inAuthGroup = currentSegment === '(auth)';
    
    // If NOT logged in, and NOT on the login page -> Redirect to Login
    if (!user && !inAuthGroup) {
        return <Redirect href={"/(auth)/login" as any} />;
    }

    // If logged in, and stuck on login -> Redirect to Driver Dashboard
    if (user && inAuthGroup) {
        // Since we are assuming all active users are drivers for now:
        return <Redirect href={"/(user)/driver" as any} />;
    }

    // Fallback: Render the current stack 
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
        </Stack>
    );
}

// --- Main Layout Component ---
export default function RootLayout() {
  return (
    // You MUST ensure the AuthProvider is available and wraps the RootGuard
    <AuthProvider>
      <RootGuard />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});