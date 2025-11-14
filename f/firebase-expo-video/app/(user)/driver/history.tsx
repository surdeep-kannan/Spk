// app/(user)/driver/history.tsx (Driver History Screen)

import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Placeholder data for past trips (includes driver ID for filtering example)
const allTripData = [
    { id: '1', driverId: 'D101', date: 'Nov 12, 2025', distance: 155.4, saved: 6.2, score: 9.5 },
    { id: '2', driverId: 'D102', date: 'Nov 11, 2025', distance: 88.0, saved: 3.1, score: 8.8 }, // Different driver
    { id: '3', driverId: 'D101', date: 'Nov 10, 2025', distance: 210.9, saved: 7.9, score: 9.1 },
];

const currentDriverId = 'D101'; // 💡 PLACEHOLDER: In a real app, this would come from the Auth state.
const currentDriverName = 'Sagar Singh'; // 💡 PLACEHOLDER

const filteredTripData = allTripData.filter(trip => trip.driverId === currentDriverId);

const TripCard = ({ trip }: { trip: typeof allTripData[0] }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{trip.date}</Text>
            <Text style={styles.scoreBadge}>Score: {trip.score}</Text>
        </View>
        <View style={styles.cardBody}>
            <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Distance:</Text>
                <Text style={styles.detailValue}>{trip.distance.toFixed(1)} km</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.detailLabelGreen}>CO₂ Saved:</Text>
                <Text style={styles.detailValueGreen}>{trip.saved.toFixed(2)} kg</Text>
            </View>
        </View>
    </View>
);

export default function DriverHistoryScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{currentDriverName}'s Trip History</Text>
            </View>
            
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {filteredTripData.length > 0 ? (
                    filteredTripData.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))
                ) : (
                    <Text style={styles.noDataText}>No trips recorded yet for {currentDriverName}.</Text>
                )}
                
                <Text style={styles.footerText}>-- End of History --</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    headerContainer: { paddingHorizontal: 25, paddingVertical: 15, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    header: { fontSize: 22, fontWeight: '700', color: '#1A4D2E' },
    scrollView: { flex: 1, padding: 0 },
    scrollContent: { padding: 25, paddingTop: 10 },
    noDataText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
    
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 5,
        borderLeftColor: '#007AFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 8,
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    scoreBadge: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A4D2E',
        backgroundColor: '#D9EDC5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    cardBody: {
        marginTop: 5,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    detailLabelGreen: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A4D2E',
    },
    detailValueGreen: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    footerText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
    }
});