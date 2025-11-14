// app/(user)/admin/index.tsx (Final Admin Dashboard Screen)

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 

// ✅ FIX: Define the explicit interface for MetricCard props
interface MetricCardProps {
    iconName: keyof typeof Ionicons.glyphMap; // Ensures iconName is a valid Ionicons name
    value: string;
    label: string;
    color: string;
}

// ✅ FIX: Apply the interface to the MetricCard component
const MetricCard: React.FC<MetricCardProps> = ({ iconName, value, label, color }) => (
    <View style={[styles.metricCard, { borderColor: color }]}>
        <Ionicons name={iconName} size={30} color={color} />
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricLabel}>{label}</Text>
    </View>
);

export default function AdminDashboardScreen() {
    const router = useRouter();
    
    // Placeholder Data for Key Performance Indicators (KPIs)
    const [totalCo2Saved] = useState('1,450.7'); // kg
    const [fleetEcoScore] = useState(8.9);        // Average score
    const [activeTrips] = useState(3);
    const [totalDrivers] = useState(12);

    const navigateTo = (screen: string) => {
        router.push(`/(user)/admin/${screen}` as any);
    };
    
    const handleRoleSwitch = () => {
        // Navigates back to the role selection screen, simulating logging out of the admin session
        router.replace('/role-select' as any); 
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                
                <Text style={styles.headerText}>Fleet Overview</Text>
                
                {/* 1. Primary CO2 Savings Metric */}
                <View style={styles.mainMetricCard}>
                    <Text style={styles.mainMetricLabel}>Total CO₂ Saved Fleet-wide</Text>
                    <Text style={styles.mainMetricValue}>{totalCo2Saved} kg</Text>
                </View>

                {/* 2. KPI Metrics Row */}
                <View style={styles.kpiRow}>
                    <MetricCard 
                        iconName="stats-chart" 
                        value={fleetEcoScore.toFixed(1)} 
                        label="Avg Eco Score" 
                        color="#1A4D2E" 
                    />
                    <MetricCard 
                        iconName="car" 
                        value={activeTrips.toString()} 
                        label="Active Trips" 
                        color="#007AFF" 
                    />
                    <MetricCard 
                        iconName="people" 
                        value={totalDrivers.toString()} 
                        label="Total Drivers" 
                        color="#333333" 
                    />
                </View>

                {/* 3. Navigation Links */}
                <Text style={styles.sectionHeader}>Management & Analysis</Text>

                <TouchableOpacity 
                    style={[styles.linkButton, { backgroundColor: '#FFD700' }]}
                    onPress={() => navigateTo('leaderboard')}
                >
                    <Ionicons name="trophy" size={24} color="#333" style={styles.linkIcon} />
                    <Text style={styles.leaderboardButtonText}>Driver Leaderboard</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.linkButton} 
                    onPress={() => navigateTo('data-analytics')}
                >
                    <Ionicons name="analytics" size={24} color="#FFFFFF" style={styles.linkIcon} />
                    <Text style={styles.linkButtonText}>Fleet Analytics</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.linkButton} 
                    onPress={() => navigateTo('user-management')}
                >
                    <Ionicons name="person-circle" size={24} color="#FFFFFF" style={styles.linkIcon} />
                    <Text style={styles.linkButtonText}>User Management</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.linkButton} 
                    onPress={() => navigateTo('vehicle-management')}
                >
                    <Ionicons name="settings" size={24} color="#FFFFFF" style={styles.linkIcon} />
                    <Text style={styles.linkButtonText}>Vehicle Management</Text>
                </TouchableOpacity>
                
                {/* 4. Exit Button */}
                <TouchableOpacity style={styles.signOutButton} onPress={handleRoleSwitch}>
                    <Text style={styles.signOutButtonText}>Exit / Switch Role</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    container: {
        padding: 20,
        paddingBottom: 50,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#333333',
        marginBottom: 30,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    // Primary Metric Card
    mainMetricCard: {
        backgroundColor: '#1A4D2E',
        padding: 30,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#1A4D2E',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    mainMetricLabel: {
        fontSize: 18,
        color: '#D9EDC5',
        marginBottom: 5,
    },
    mainMetricValue: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    // KPI Row
    kpiRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    metricCard: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        width: '31%',
        alignItems: 'center',
        borderBottomWidth: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    metricValue: {
        fontSize: 24,
        fontWeight: '800',
        marginTop: 5,
    },
    metricLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
    // Navigation Links
    sectionHeader: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    linkButton: {
        backgroundColor: '#666666',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    linkButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 15,
    },
    leaderboardButtonText: { // Special style for the gold button text
        color: '#333333',
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 15,
    },
    linkIcon: {
        minWidth: 24, // Ensure alignment
    },
    signOutButton: {
        backgroundColor: '#FF3B30',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    signOutButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    }
});