// app/(user)/admin/data-analytics.tsx

import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit'; 
// REMOVED: * as Sharing, * as FileSystem
import { Ionicons } from '@expo/vector-icons'; 

// --- Synthesis Data for Charts ---
const { width } = Dimensions.get('window');
const chartWidth = width - 50; 

const emissionData = {
    labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    datasets: [{
        data: [0.35, 0.34, 0.33, 0.32],
        color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, 
        strokeWidth: 2
    }]
};

const scoreData = {
    labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    datasets: [{
        data: [8.5, 8.8, 9.1, 9.3],
        color: (opacity = 1) => `rgba(26, 77, 46, ${opacity})`, 
        strokeWidth: 2
    }]
};

// --- Component Definitions ---

export default function DataAnalyticsScreen() {
    const [filterPeriod, setFilterPeriod] = useState('Weekly');
    const totalCo2Saved = '1,450.7 kg';

    // 🛑 REMOVED: exportAndShareData function

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
                <Text style={styles.header}>Fleet Performance Analytics</Text>

                {/* Overall Metric Card */}
                <View style={styles.totalCard}>
                    <Text style={styles.totalLabel}>Total CO₂ Saved Fleet-wide</Text>
                    <Text style={styles.totalValue}>{totalCo2Saved}</Text>
                </View>

                {/* Filter Segment */}
                <View style={styles.filterContainer}>
                    {['Daily', 'Weekly', 'Monthly'].map((period) => (
                        <TouchableOpacity
                            key={period}
                            style={[styles.filterButton, filterPeriod === period && styles.filterButtonActive]}
                            onPress={() => setFilterPeriod(period)}
                        >
                            <Text style={[styles.filterText, filterPeriod === period && styles.filterTextActive]}>{period}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                {/* --- Charts Section --- */}
                <Text style={styles.sectionHeader}>CO₂ Emission & Score Trends</Text>
                
                {/* 1. CO2 Efficiency Chart */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitleText}>Avg CO₂ Emitted per km (Trend)</Text>
                    <LineChart
                        data={emissionData}
                        width={chartWidth}
                        height={200}
                        yAxisSuffix=" kg"
                        chartConfig={{
                            backgroundColor: '#FFFFFF',
                            backgroundGradientFrom: '#FFFFFF',
                            backgroundGradientTo: '#FFFFFF',
                            decimalPlaces: 3,
                            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, 
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: { borderRadius: 16 },
                        }}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                    />
                </View>

                {/* 2. Eco-Score Trend Chart */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitleText}>Average Driver Eco-Score</Text>
                    <LineChart
                        data={scoreData}
                        width={chartWidth}
                        height={200}
                        yAxisInterval={1}
                        yAxisLabel=""
                        chartConfig={{
                            backgroundColor: '#FFFFFF',
                            backgroundGradientFrom: '#FFFFFF',
                            backgroundGradientTo: '#FFFFFF',
                            decimalPlaces: 1,
                            color: (opacity = 1) => `rgba(26, 77, 46, ${opacity})`, 
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: { borderRadius: 16 },
                        }}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                    />
                </View>


                {/* --- Export Button (Removed) --- 
                    If you later re-enable export, you would place the button here.
                */}
                <View style={{ height: 50 }} /> 

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    scrollView: { flex: 1, padding: 0 },
    container: {
        padding: 25,
        alignItems: 'center',
        paddingBottom: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: '800',
        color: '#333333',
        marginBottom: 20,
    },
    totalCard: {
        backgroundColor: '#1A4D2E',
        padding: 25,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#1A4D2E',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    totalLabel: {
        fontSize: 16,
        color: '#D9EDC5',
        marginBottom: 5,
    },
    totalValue: {
        fontSize: 40,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
        marginBottom: 25,
        width: '100%',
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
    chartContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 20,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    chartTitleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 15,
    },
    // The exportButton and exportButtonText styles are now obsolete but kept here for reference
    exportButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    exportButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});