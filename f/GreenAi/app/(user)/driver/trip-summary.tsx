// app/(user)/driver/trip-summary.tsx

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../../../i18n/i18n'; 
import { useTranslation } from 'react-i18next'; 

export default function TripSummaryScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const params = useLocalSearchParams(); 

    const co2Saved = params.saved || '0.00'; 
    const totalDistance = params.distance || '0.0';
    
    const [averageSpeed] = useState('45'); 
    const [ecoScore] = useState(9.2); 

    const handleFinish = () => {
        router.replace('/(user)/driver' as any); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                
                <Text style={styles.header}>{t('trip_completed_header')}</Text>
                
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>{t('final_score')}</Text>
                    <Text style={styles.scoreValue}>{ecoScore.toFixed(1)}</Text>
                </View>

                <View style={styles.summaryCard}>
                    <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>{t('total_distance')}</Text>
                        <Text style={styles.metricValue}>{totalDistance} {t('km_unit')}</Text>
                    </View>
                    
                    <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>{t('average_speed')}</Text>
                        <Text style={styles.metricValue}>{averageSpeed} {t('kmh_unit')}</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.metricRow}>
                        <Text style={styles.metricLabelImportant}>{t('co2_saved_route')}</Text>
                        <Text style={styles.metricValueSavings}>{co2Saved} {t('kg_unit')}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={handleFinish}>
                    <Text style={styles.primaryButtonText}>{t('return_dashboard').toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    container: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1A4D2E',
        marginBottom: 10,
        marginTop: 10,
    },
    scoreContainer: {
        backgroundColor: '#D9EDC5',
        padding: 20,
        borderRadius: 100,
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 10,
        borderWidth: 4,
        borderColor: '#1A4D2E',
    },
    scoreLabel: {
        fontSize: 16,
        color: '#333',
    },
    scoreValue: {
        fontSize: 55,
        fontWeight: '800',
        color: '#1A4D2E',
    },
    summaryCard: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 30,
    },
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    metricLabel: {
        fontSize: 16,
        color: '#666',
    },
    metricLabelImportant: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A4D2E',
    },
    metricValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    metricValueSavings: {
        fontSize: 20,
        fontWeight: '800',
        color: '#007AFF',
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 10,
    },
    primaryButton: {
        backgroundColor: '#1A4D2E',
        padding: 18,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});