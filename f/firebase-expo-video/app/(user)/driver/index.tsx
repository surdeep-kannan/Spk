// app/(user)/driver/index.tsx (Driver Dashboard Screen)

import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import '../../../i18n/i18n'; 
import { useTranslation } from 'react-i18next'; 

export default function DriverDashboardScreen() {
    const router = useRouter();
    const { t, i18n } = useTranslation(); 
    
    const [driverName] = useState('Driver 101'); 
    const [currentStatus] = useState(t('ready_route')); 
    const [co2SavedToday] = useState(0.85); 

    const handleStartNewRoute = () => {
        router.push('/(user)/driver/route-input' as any); 
    };

    const handleRoleSwitch = () => {
        router.replace('/role-select' as any); 
    };
    
    // Function to switch language
    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(newLang)
            .then(() => Alert.alert("Language Changed", `Current Language: ${newLang.toUpperCase()}`))
            .catch(err => console.error("Language change error:", err));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>{t('welcome_message')}</Text> 
                
                <Text style={styles.statusLabel}>{t('status_label')}</Text>
                <View style={styles.statusBox}>
                    <Text style={styles.statusText}>{currentStatus}</Text>
                </View>

                {/* CO2 Savings Metric */}
                <View style={styles.metricCard}>
                    <Text style={styles.metricValue}>
                        {co2SavedToday.toFixed(2)} {t('kg_unit')}
                    </Text>
                    <Text style={styles.metricLabel}>{t('co2_saved_today')}</Text>
                </View>

                {/* Primary Action Button */}
                <TouchableOpacity style={styles.primaryButton} onPress={handleStartNewRoute}>
                    <Text style={styles.primaryButtonText}>{t('start_route_btn').toUpperCase()}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signOutButton} onPress={handleRoleSwitch}>
                    <Text style={styles.signOutButtonText}>{t('exit_role_btn')}</Text>
                </TouchableOpacity>

                {/* Testing button to toggle language */}
                <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
                    <Text style={styles.langButtonText}>Switch to {i18n.language === 'en' ? 'Hindi' : 'English'}</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F5F5F5', },
    container: { flex: 1, padding: 25, alignItems: 'center', },
    welcomeText: { fontSize: 24, fontWeight: '700', color: '#1A4D2E', marginBottom: 30, },
    statusLabel: { fontSize: 16, color: '#666', marginBottom: 5, },
    statusBox: { backgroundColor: '#D9EDC5', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginBottom: 40, borderWidth: 1, borderColor: '#1A4D2E', },
    statusText: { fontSize: 18, fontWeight: '600', color: '#1A4D2E', },
    metricCard: {
        backgroundColor: '#FFFFFF', padding: 25, borderRadius: 15, width: '100%', alignItems: 'center', marginBottom: 40,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5,
    },
    metricValue: { fontSize: 36, fontWeight: '800', color: '#1A4D2E', },
    metricLabel: { fontSize: 14, color: '#666', marginTop: 5, },
    primaryButton: { backgroundColor: '#007AFF', padding: 18, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 20, },
    primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', },
    signOutButton: {
        padding: 10,
        marginTop: 10,
    },
    signOutButtonText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: '600',
    },
    langButton: {
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 20,
    },
    langButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    }
});