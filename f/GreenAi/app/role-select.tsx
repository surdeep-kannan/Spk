// app/role-select.tsx

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleSelectionScreen() {
    const router = useRouter();

    const navigateToRole = (role: 'driver' | 'admin') => {
        // Direct navigation to the specific role's index page within the (user) group
        if (role === 'driver') {
            // Navigates to app/(user)/driver/index.tsx
            router.replace('/(user)/driver' as any); 
        } else {
            // Navigates to app/(user)/admin/index.tsx
            router.replace('/(user)/admin' as any);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerText}>GreenRoute-AI</Text>
                <Text style={styles.subHeaderText}>Select User Role</Text>

                <TouchableOpacity 
                    style={[styles.button, styles.driverButton]} 
                    onPress={() => navigateToRole('driver')}
                >
                    <Text style={styles.buttonText}>Enter as DRIVER</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.adminButton]} 
                    onPress={() => navigateToRole('admin')}
                >
                    <Text style={styles.buttonText}>Enter as ADMIN</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1A4D2E',
        marginBottom: 10,
    },
    subHeaderText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 50,
    },
    button: {
        padding: 18,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    driverButton: {
        backgroundColor: '#007AFF', // Driver (Action Blue)
    },
    adminButton: {
        backgroundColor: '#333333', // Admin (Dark)
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 18,
    },
});