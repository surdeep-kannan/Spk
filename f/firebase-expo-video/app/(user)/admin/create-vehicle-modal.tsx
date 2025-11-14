// app/(user)/admin/create-vehicle-modal.tsx

import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import React, { useState } from 'react';

type VehicleData = {
    name: string;
    license: string;
    fuel: 'Diesel' | 'Petrol' | 'Electric';
    co2_baseline: number;
};

type Props = {
    onSaveCallback: (vehicle: Omit<VehicleData, 'assigned_driver'>) => void;
    onClose: () => void;
};

export default function CreateVehicleModal({ onSaveCallback, onClose }: Props) {
    const [model, setModel] = useState('');
    const [license, setLicense] = useState('');
    const [fuelType, setFuelType] = useState<'Diesel' | 'Petrol' | 'Electric'>('Diesel');
    const [co2Baseline, setCo2Baseline] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        if (!model || !license || !co2Baseline || isNaN(parseFloat(co2Baseline)) || parseFloat(co2Baseline) < 0) return;

        const vehicle = {
            name: model.trim(),
            license: license.trim(),
            fuel: fuelType,
            co2_baseline: parseFloat(co2Baseline),
        };

        onSaveCallback(vehicle);
    };

    return (
        <Modal visible={true} animationType="slide" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        <Text style={styles.label}>Vehicle Model/Name</Text>
                        <TextInput style={styles.input} value={model} onChangeText={setModel} placeholder="e.g., TATA Ace" />

                        <Text style={styles.label}>License Plate / VIN</Text>
                        <TextInput style={styles.input} value={license} onChangeText={setLicense} placeholder="e.g., TN-01-AB-1234" />

                        <Text style={styles.label}>CO₂ Baseline (kg/km)</Text>
                        <TextInput style={styles.input} value={co2Baseline} onChangeText={setCo2Baseline} placeholder="e.g., 0.35" keyboardType="numeric" />

                        <Text style={styles.label}>Fuel Type</Text>
                        <View style={styles.fuelContainer}>
                            {['Diesel', 'Petrol', 'Electric'].map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[styles.fuelButton, fuelType === type && styles.fuelButtonActive]}
                                    onPress={() => setFuelType(type as 'Diesel' | 'Petrol' | 'Electric')}
                                >
                                    <Text style={[styles.fuelText, fuelType === type && styles.fuelTextActive]}>{type}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
                            <Text style={styles.primaryButtonText}>SAVE VEHICLE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: '#AAA', marginTop: 10 }]} onPress={onClose}>
                            <Text style={styles.primaryButtonText}>CANCEL</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '90%', backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' },
    label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 15 },
    input: { height: 50, borderColor: '#E0E6ED', borderWidth: 1, paddingHorizontal: 15, borderRadius: 8, backgroundColor: '#fff', fontSize: 16, },
    fuelContainer: { flexDirection: 'row', backgroundColor: '#EAEAEA', borderRadius: 8, marginBottom: 20, overflow: 'hidden' },
    fuelButton: { flex: 1, paddingVertical: 12, alignItems: 'center' },
    fuelButtonActive: { backgroundColor: '#1A4D2E' },
    fuelText: { fontSize: 16, fontWeight: '600', color: '#666' },
    fuelTextActive: { color: '#fff' },
    primaryButton: { backgroundColor: '#1A4D2E', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
    primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 }
});
