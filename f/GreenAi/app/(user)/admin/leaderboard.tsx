// app/(user)/admin/leaderboard.tsx

import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have expo vector icons installed

// Data Structure: Ranked list of drivers based on a score
const leaderboardData = [
    { rank: 1, name: 'Sagar Singh', totalSaved: 85.6, trips: 15, score: 9.8, trend: 'up' },
    { rank: 2, name: 'Priya Sharma', totalSaved: 78.2, trips: 18, score: 9.5, trend: 'stable' },
    { rank: 3, name: 'Vikas Reddy', totalSaved: 64.9, trips: 10, score: 9.1, trend: 'up' },
    { rank: 4, name: 'Anil Kumar', totalSaved: 59.1, trips: 22, score: 8.9, trend: 'down' },
    { rank: 5, name: 'Ravi Kumar', totalSaved: 51.3, trips: 14, score: 8.5, trend: 'stable' },
];

const LeaderboardRow = ({ driver }: { driver: typeof leaderboardData[0] }) => {
    const rankColor = driver.rank <= 3 ? '#FFD700' : '#E0E0E0'; // Gold for top 3
    const trendIcon = driver.trend === 'up' ? 'arrow-up-circle' : driver.trend === 'down' ? 'arrow-down-circle' : 'remove-circle';
    const trendColor = driver.trend === 'up' ? '#1A4D2E' : driver.trend === 'down' ? '#FF3B30' : '#999';

    return (
        <View style={rowStyles.row}>
            <View style={[rowStyles.rankContainer, { backgroundColor: rankColor }]}>
                <Text style={rowStyles.rankText}>{driver.rank}</Text>
            </View>

            <View style={rowStyles.info}>
                <Text style={rowStyles.name}>{driver.name}</Text>
                <Text style={rowStyles.trips}>{driver.trips} Trips | {driver.totalSaved.toFixed(1)} kg saved</Text>
            </View>

            <View style={rowStyles.metrics}>
                <Ionicons name={trendIcon as any} size={18} color={trendColor} style={{ marginRight: 5 }} />
                <Text style={rowStyles.score}>{driver.score.toFixed(1)}</Text>
            </View>
        </View>
    );
};

export default function LeaderboardScreen() {
    const [period, setPeriod] = useState('Weekly');
    
    // NOTE: In a real app, you would fetch data filtered by 'period'
    const topDriver = leaderboardData[0];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                
                <Text style={styles.header}>Eco Driver Leaderboard</Text>

                {/* Filter Controls */}
                <View style={styles.filterContainer}>
                    {['Daily', 'Weekly', 'Monthly'].map((p) => (
                        <TouchableOpacity
                            key={p}
                            style={[styles.filterButton, period === p && styles.filterButtonActive]}
                            onPress={() => setPeriod(p)}
                        >
                            <Text style={[styles.filterText, period === p && styles.filterTextActive]}>{p}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Top Driver Highlight Card */}
                <View style={styles.topCard}>
                    <Text style={styles.topRankLabel}>Top Eco Driver - {period}</Text>
                    <Text style={styles.topDriverName}>{topDriver.name}</Text>
                    <Text style={styles.topMetric}>{topDriver.score.toFixed(1)} Eco Score</Text>
                    <Text style={styles.topMetricDetail}>{topDriver.totalSaved.toFixed(1)} kg of CO₂ Saved</Text>
                </View>

                {/* Leaderboard Rows */}
                <Text style={styles.sectionHeader}>Full Ranking</Text>
                
                {leaderboardData.map((driver) => (
                    <LeaderboardRow key={driver.rank} driver={driver} />
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}

const rowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1.5,
        elevation: 1,
    },
    rankContainer: {
        width: 35,
        height: 35,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#999',
    },
    rankText: {
        fontWeight: '900',
        fontSize: 16,
        color: '#333',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
    },
    trips: {
        fontSize: 12,
        color: '#666',
    },
    metrics: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A4D2E',
        minWidth: 40,
        textAlign: 'right',
    }
});


const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    scrollView: { flex: 1 },
    scrollContent: { padding: 20 },
    header: {
        fontSize: 24,
        fontWeight: '800',
        color: '#333333',
        marginBottom: 20,
        textAlign: 'center',
    },
    // Filter Styles
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    filterButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: '#333333',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    filterTextActive: {
        color: '#FFFFFF',
    },
    // Top Card Styles
    topCard: {
        backgroundColor: '#D9EDC5',
        padding: 25,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 2,
        borderColor: '#1A4D2E',
    },
    topRankLabel: {
        fontSize: 18,
        fontWeight: '500',
        color: '#1A4D2E',
    },
    topDriverName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1A4D2E',
        marginVertical: 5,
    },
    topMetric: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    topMetricDetail: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    }
});