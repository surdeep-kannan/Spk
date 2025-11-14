// app/(user)/admin/user-management.tsx

import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Define User Type (Expanded to include Status)
type UserItem = {
    id: string;
    name: string;
    role: 'Driver' | 'Admin';
    status: 'Active' | 'Inactive' | 'Pending'; 
    trips: number;
};

// Define the type for data received directly from the modal after editing
type EditedUserData = {
    id: string;
    role: string;
    status: string;
};

// Initial state data (Example Data)
const initialUsersData: UserItem[] = [
    { id: 'u1', name: 'Sagar Singh', role: 'Driver', status: 'Active', trips: 45 },
    { id: 'u2', name: 'Ravi Kumar', role: 'Driver', status: 'Pending', trips: 12 }, 
    { id: 'u3', name: 'Priya Sharma', role: 'Admin', status: 'Active', trips: 0 },
];

// --- User Row Component ---
// Note: This component now accepts the 'onEdit' handler as a prop.
const UserRow = ({ user, onEdit }: { user: UserItem, onEdit: (user: UserItem) => void }) => {
    const statusColor = user.status === 'Active' ? '#1A4D2E' : user.status === 'Pending' ? '#FFD700' : '#FF3B30';
    return (
        <View style={userRowStyles.row}>
            <View style={userRowStyles.info}>
                <Text style={userRowStyles.name}>{user.name}</Text>
                <Text style={userRowStyles.role}>{user.role} | {user.trips} Trips</Text>
            </View>
            <View style={userRowStyles.actions}>
                <Text style={[userRowStyles.status, { color: statusColor }]}>{user.status}</Text>
                {/* ✅ Trigger Edit Modal on Press */}
                <TouchableOpacity onPress={() => onEdit(user)}>
                    <Text style={userRowStyles.manageButton}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
// --- End User Row Component ---


export default function UserManagementScreen() {
    const router = useRouter(); 
    const [users, setUsers] = useState<UserItem[]>(initialUsersData);

    // --- 1. Function to handle updates from the edit modal ---
    // This function receives the updated data from the modal and updates the local state.
    const handleUserEdited = useCallback((editedData: EditedUserData) => {
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === editedData.id 
                ? { 
                    ...user, 
                    role: editedData.role as UserItem['role'], 
                    status: editedData.status as UserItem['status'] 
                  } 
                : user
            )
        );
    }, []);

    // --- MOCK FUNCTION: For adding new users via the Create Modal ---
    const handleAddNewUser = () => {
        // Mock function to add a user for demonstration, replace with router.push for real form
        const mockNewUser: UserItem = { id: `u${Date.now()}`, name: 'Pending User', role: 'Driver', status: 'Pending', trips: 0 };
        setUsers(prevUsers => [mockNewUser, ...prevUsers]); 
    };

    // --- 2. Function to open the EDIT modal ---
    const openEditModal = useCallback((userToEdit: UserItem) => {
        router.push({
            pathname: '/(user)/admin/edit-user-modal',
            params: {
                userId: userToEdit.id,
                name: userToEdit.name,
                role: userToEdit.role,
                status: userToEdit.status,
                // ✅ Pass the update function via params for list synchronization
                onEditCallback: handleUserEdited 
            }
        } as any);
    }, [handleUserEdited, router]);
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Fleet Users ({users.length})</Text>
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={handleAddNewUser} // Triggers mock add/creation modal
                >
                    <Text style={styles.addButtonText}>+ Add New</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {users.map((user) => (
                    // ✅ Pass the edit function to each row
                    <UserRow key={user.id} user={user} onEdit={openEditModal} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const userRowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#333333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 14,
    },
    manageButton: {
        color: '#007AFF',
        fontWeight: '600',
        fontSize: 15,
    }
});

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    header: { fontSize: 24, fontWeight: '700', color: '#333333' },
    addButton: { backgroundColor: '#1A4D2E', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
    addButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
    scrollView: { flex: 1, padding: 0 },
    scrollContent: { padding: 25, paddingTop: 15 },
});