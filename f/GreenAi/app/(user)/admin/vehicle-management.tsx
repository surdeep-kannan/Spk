// app/(user)/admin/vehicle-management.tsx

import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Define Vehicle Type (Corrected)
type VehicleItem = {
    id: string;
    name: string;
    license: string;
    fuel: string;
    co2_baseline: number;
    assigned_driver: string;
    // ✅ FIX: Added the missing 'status' property
    status: 'Active' | 'Inactive' | 'Maintenance'; 
};

// Define the type for data received directly from the modal
type NewVehicleData = {
    name: string;
    license: string;
    fuel: string;
    co2_baseline: number;
};

// Initial state data (Updated to include status)
const initialVehiclesData: VehicleItem[] = [
    { id: 'v1', name: 'Ashok Leyland 1212', license: 'TN-01-AB-1234', fuel: 'Diesel', co2_baseline: 0.35, assigned_driver: 'Sagar Singh', status: 'Active' },
    { id: 'v2', name: 'Eicher Pro 3015', license: 'KA-02-CD-5678', fuel: 'Diesel', co2_baseline: 0.40, assigned_driver: 'Unassigned', status: 'Maintenance' },
    { id: 'v3', name: 'TATA Ace', license: 'KL-03-EF-9012', fuel: 'Petrol', co2_baseline: 0.25, assigned_driver: 'Ravi Kumar', status: 'Active' },
];

const VehicleCard = ({ vehicle }: { vehicle: VehicleItem }) => {
    const statusColor = vehicle.status === 'Active' ? '#1A4D2E' : vehicle.status === 'Maintenance' ? '#FFD700' : '#FF3B30';
    return (
        <View style={vehicleCardStyles.card}>
            <View style={vehicleCardStyles.header}>
                <Text style={vehicleCardStyles.title}>{vehicle.name}</Text>
                <Text style={vehicleCardStyles.license}>{vehicle.license}</Text>
            </View>
            <View style={vehicleCardStyles.details}>
                <Text style={vehicleCardStyles.detailText}>Fuel Type: {vehicle.fuel}</Text>
                <Text style={vehicleCardStyles.detailText}>CO₂ Baseline: {vehicle.co2_baseline.toFixed(2)} kg/km</Text>
                <Text style={vehicleCardStyles.driverText}>Assigned: {vehicle.assigned_driver}</Text>
                {/* Display the Status */}
                <Text style={[vehicleCardStyles.statusText, { color: statusColor }]}>Status: {vehicle.status}</Text>
            </View>
            <TouchableOpacity style={vehicleCardStyles.button} onPress={() => Alert.alert('Edit Vehicle', `Editing ${vehicle.name}`)}>
                <Text style={vehicleCardStyles.buttonText}>Edit Details</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function VehicleManagementScreen() {
    const router = useRouter();
    const [vehicles, setVehicles] = useState<VehicleItem[]>(initialVehiclesData);

    const addVehicleToList = useCallback((newVehicleData: NewVehicleData) => {
        // Create the full object structure required for the list state
        const vehicleWithId: VehicleItem = {
            ...newVehicleData,
            id: `v${Date.now()}`, 
            assigned_driver: 'Unassigned',
            status: 'Active', // Now correctly defined in the type
        };
        // Update the state immediately, causing the list to re-render
        setVehicles(prev => [vehicleWithId, ...prev]);
        console.log("New vehicle added to state list:", vehicleWithId.name);
    }, []); 

    const handleAddVehicle = () => {
        // Pass the addVehicleToList function via router params
        router.push({
            pathname: '/(user)/admin/create-vehicle-modal',
            params: { 
                onSaveCallback: addVehicleToList 
            }
        } as any);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Fleet Vehicles ({vehicles.length})</Text>
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={handleAddVehicle}
                >
                    <Text style={styles.addButtonText}>+ Add New</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
                {vehicles.length === 0 && (
                    <Text style={{textAlign: 'center', marginTop: 50, color: '#999'}}>No vehicles found in the fleet.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const vehicleCardStyles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    license: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    details: {
        marginBottom: 10,
    },
    detailText: {
        fontSize: 14,
        marginBottom: 3,
    },
    driverText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1A4D2E',
        marginTop: 5,
    },
    statusText: { // New style for status display
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#333',
        fontWeight: '600',
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