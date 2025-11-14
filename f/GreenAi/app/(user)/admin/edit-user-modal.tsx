// app/(user)/admin/edit-user-modal.tsx

import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserEditingModal() {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    // 🛑 IMPORTANT: These states are initialized from the parameters passed by the parent screen
    const initialUser = {
        id: params.userId as string || 'N/A',
        name: params.name as string || 'Unknown User',
        currentRole: params.role as 'Driver' | 'Admin' || 'Driver',
        currentStatus: params.status as 'Active' | 'Inactive' | 'Pending' || 'Pending',
    };

    const [selectedRole, setSelectedRole] = useState(initialUser.currentRole);
    const [selectedStatus, setSelectedStatus] = useState(initialUser.currentStatus);

    const handleSaveEdits = () => {
        // 1. In a real application, you would use Firestore to:
        //    db.collection('users').doc(initialUser.id).update({ role: selectedRole, status: selectedStatus });
        
        // 2. You then need to trigger the refresh in the parent list.
        const onEditCallback = params.onEditCallback as unknown as (editedData: { id: string, role: string, status: string }) => void;
        
        if (onEditCallback && typeof onEditCallback === 'function') {
            onEditCallback({ 
                id: initialUser.id, 
                role: selectedRole, 
                status: selectedStatus 
            });
        }
        
        Alert.alert(
            "Success",
            `User ${initialUser.name}'s role updated to ${selectedRole} and status to ${selectedStatus}.`,
            [{ text: 'OK', onPress: () => router.back() }] 
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ title: `Edit User: ${initialUser.name}` }} />
            <ScrollView contentContainerStyle={styles.container}>
                
                <Text style={styles.label}>Editing Account</Text>
                <Text style={styles.inputReadOnly}>{initialUser.name} ({initialUser.id})</Text>

                {/* 1. ROLE SELECTION */}
                <Text style={styles.label}>Change Role</Text>
                <View style={styles.segmentContainer}>
                    {['Driver', 'Admin'].map((r) => (
                        <TouchableOpacity
                            key={r}
                            style={[styles.segmentButton, selectedRole === r && styles.segmentButtonActive]}
                            onPress={() => setSelectedRole(r as 'Driver' | 'Admin')}
                        >
                            <Text style={[styles.segmentText, selectedRole === r && styles.segmentTextActive]}>{r}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 2. STATUS SELECTION (Crucial for approval workflow) */}
                <Text style={styles.label}>Change Status</Text>
                <View style={styles.segmentContainer}>
                    {['Pending', 'Active', 'Inactive'].map((s) => (
                        <TouchableOpacity
                            key={s}
                            style={[styles.segmentButton, selectedStatus === s && styles.segmentButtonActive]}
                            onPress={() => setSelectedStatus(s as 'Active' | 'Inactive' | 'Pending')}
                        >
                            <Text style={[styles.segmentText, selectedStatus === s && styles.segmentTextActive]}>{s}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={handleSaveEdits}>
                    <Text style={styles.primaryButtonText}>SAVE CHANGES</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    container: { padding: 25, paddingBottom: 50, },
    label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 15, },
    inputReadOnly: { height: 50, borderColor: '#E0E6ED', borderWidth: 1, paddingHorizontal: 15, borderRadius: 8, backgroundColor: '#EAEAEA', fontSize: 16, paddingTop: 15, color: '#666' },
    
    // Segment Control Styles
    segmentContainer: { flexDirection: 'row', backgroundColor: '#EAEAEA', borderRadius: 8, marginBottom: 20, overflow: 'hidden', },
    segmentButton: { flex: 1, paddingVertical: 12, alignItems: 'center', },
    segmentButtonActive: { backgroundColor: '#333333', },
    segmentText: { fontSize: 16, fontWeight: '600', color: '#666', },
    segmentTextActive: { color: '#FFFFFF', },

    primaryButton: {
        backgroundColor: '#1A4D2E',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        elevation: 5,
    },
    primaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 18, },
});