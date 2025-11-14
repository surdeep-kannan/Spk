// app/(user)/driver/route-input.tsx

import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import '../../../i18n/i18n'; 
import { useTranslation } from 'react-i18next'; 


export default function RouteInputScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    
    const [startType, setStartType] = useState<'gps' | 'manual'>('gps');
    const [startLocation, setStartLocation] = useState(t('fetching_loc'));
    const [manualStartLocation, setManualStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [vehicleType] = useState('Standard Truck');
    const [isGpsLoading, setIsGpsLoading] = useState(false);

    // Fetch GPS location (implementation details omitted for brevity, but keys are used)
    const getGpsLocation = async () => {
        if (startType !== 'gps') return;
        setIsGpsLoading(true);
        setStartLocation(t('fetching_loc')); 
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setStartLocation(t('permission_denied')); 
            setIsGpsLoading(false);
            Alert.alert(t('permission_denied'), "Permission to access location was denied.");
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
            setStartLocation(geocode[0].name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } catch (error) {
            setStartLocation(t('failed_loc')); 
            Alert.alert("GPS Error", t('failed_loc'));
        } finally {
            setIsGpsLoading(false);
        }
    };

    useEffect(() => {
        if (startType === 'gps') {
            getGpsLocation();
        }
    }, [startType]);

    // Handle navigation to navigation screen
    const handleFindRoute = () => {
        let finalStartPoint = startType === 'gps' ? 'GPS' : manualStartLocation.trim();

        if (startType === 'manual' && finalStartPoint === '') {
            Alert.alert("Error", t('start_point') + " is required.");
            return;
        }

        if (!destination.trim()) {
            Alert.alert("Error", t('destination_label') + " is required.");
            return;
        }

        router.push({
            pathname: '/(user)/driver/navigation',
            params: {
                start: finalStartPoint,
                dest: destination.trim(),
                vehicle: vehicleType
            }
        } as any);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.header}>{t('plan_route_header')}</Text>

                <Text style={styles.label}>{t('vehicle_label')}</Text>
                <TextInput style={[styles.input, styles.disabledInput]} value={vehicleType} editable={false} />

                <Text style={styles.label}>{t('start_source')}</Text>
                <View style={styles.segmentControlContainer}>
                    <TouchableOpacity
                        style={[styles.segmentButton, startType === 'gps' && styles.segmentButtonActive]}
                        onPress={() => setStartType('gps')} disabled={isGpsLoading}
                    >
                        <Text style={[styles.segmentText, startType === 'gps' && styles.segmentTextActive]}>{t('use_gps')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.segmentButton, startType === 'manual' && styles.segmentButtonActive]}
                        onPress={() => setStartType('manual')} disabled={isGpsLoading}
                    >
                        <Text style={[styles.segmentText, startType === 'manual' && styles.segmentTextActive]}>{t('enter_manually')}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>{t('start_point')}</Text>
                <View style={[styles.input, startType === 'gps' ? styles.disabledInput : styles.enabledInput, styles.inputWithSpinner]}>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder={startType === 'gps' ? t('fetching_loc') : "Enter Start Address"}
                        value={startType === 'gps' ? startLocation : manualStartLocation}
                        onChangeText={setManualStartLocation}
                        editable={startType === 'manual'}
                        autoCapitalize="words"
                        placeholderTextColor="#A0AEC0"
                    />
                    {isGpsLoading && startType === 'gps' && (
                        <ActivityIndicator size="small" color="#1A4D2E" style={styles.spinner} />
                    )}
                </View>

                <Text style={styles.label}>{t('destination_label')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Destination Address"
                    value={destination}
                    onChangeText={setDestination}
                    autoCapitalize="words"
                    placeholderTextColor="#A0AEC0"
                />

                <TouchableOpacity style={styles.primaryButton} onPress={handleFindRoute} disabled={isGpsLoading}>
                    <Text style={styles.primaryButtonText}>{t('find_route_btn').toUpperCase()}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
    container: { flex: 1, padding: 25, backgroundColor: '#F7F9FC' },
    header: { fontSize: 26, fontWeight: '700', color: '#1A4D2E', marginBottom: 30, textAlign: 'center' },
    label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
    input: { height: 50, borderColor: '#E0E6ED', borderWidth: 1, marginBottom: 25, paddingHorizontal: 15, borderRadius: 8, fontSize: 16 },
    enabledInput: { backgroundColor: '#fff' },
    disabledInput: { backgroundColor: '#EAEAEA', color: '#666' },
    segmentControlContainer: { flexDirection: 'row', backgroundColor: '#EAEAEA', borderRadius: 8, marginBottom: 20, overflow: 'hidden' },
    segmentButton: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: '#EAEAEA' },
    segmentButtonActive: { backgroundColor: '#007AFF' },
    segmentText: { fontSize: 14, fontWeight: '600', color: '#333' },
    segmentTextActive: { color: '#FFFFFF' },
    primaryButton: { backgroundColor: '#1A4D2E', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 20 },
    primaryButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
    inputWithSpinner: { flexDirection: 'row', alignItems: 'center', paddingRight: 15, height: 50, borderColor: '#E0E6ED', borderWidth: 1, marginBottom: 25, borderRadius: 8 },
    textInputStyle: { flex: 1, paddingHorizontal: 15, height: '100%', fontSize: 16, color: '#333' },
    spinner: { marginLeft: 10 },
});