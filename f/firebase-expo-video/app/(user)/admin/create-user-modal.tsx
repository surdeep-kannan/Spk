// app/(user)/admin/create-user-modal.tsx

import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserCreationModal() {
    const router = useRouter();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'Driver' | 'Admin'>('Driver');
    const [password, setPassword] = useState('');

    const handleCreateUser = () => {
        if (!name || !email || !password || password.length < 6) {
            Alert.alert("Input Error", "Please fill all fields and ensure password is 6+ characters.");
            return;
        }

        // 1. In a real app, you would:
        //    a. Generate a secure, unique password (or use the one entered).
        //    b. Use Firebase Admin SDK (server-side) or the client SDK (requires special setup)
        //       to create the user account and assign a role in a database (like Firestore).

        console.log({ name, email, role, password });
        
        Alert.alert(
            "Success",
            `User ${name} (${role}) created successfully (Placeholder).`,
            [{ text: 'OK', onPress: () => router.back() }] // Close the modal
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ title: 'Add New User' }} />
            <ScrollView contentContainerStyle={styles.container}>
                
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="e.g., John Smith"
                    autoCapitalize="words"
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="e.g., john@ecoroute.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                
                <Text style={styles.label}>Temporary Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="6+ characters required"
                    secureTextEntry={true}
                />
                
                <Text style={styles.label}>Select Role</Text>
                <View style={styles.roleContainer}>
                    {['Driver', 'Admin'].map((r) => (
                        <TouchableOpacity
                            key={r}
                            style={[styles.roleButton, role === r && styles.roleButtonActive]}
                            onPress={() => setRole(r as 'Driver' | 'Admin')}
                        >
                            <Text style={[styles.roleText, role === r && styles.roleTextActive]}>{r}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={handleCreateUser}>
                    <Text style={styles.primaryButtonText}>CREATE USER ACCOUNT</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    container: {
        padding: 25,
        paddingBottom: 50,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        height: 50,
        borderColor: '#E0E6ED',
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    roleContainer: {
        flexDirection: 'row',
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    roleButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    roleButtonActive: {
        backgroundColor: '#333333',
    },
    roleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    roleTextActive: {
        color: '#FFFFFF',
    },
    primaryButton: {
        backgroundColor: '#1A4D2E',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});