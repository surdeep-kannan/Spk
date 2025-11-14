// app/(user)/driver/navigation.tsx
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjU0YjlhOWQ0MzQzOTQwNmU5NTNlY2ViZTMwZjE5YzVmIiwiaCI6Im11cm11cjY0In0='; // Replace with your ORS key

export default function NavigationScreen() {
  const mapRef = useRef<MapView>(null);

  const [startAddress, setStartAddress] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [startCoords, setStartCoords] = useState<number[] | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<number[] | null>(null);
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[] | null>(null);
  const [instructions, setInstructions] = useState<string>(''); // next maneuver

  // Live location tracking
  useEffect(() => {
    let subscriber: Location.LocationSubscription;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission required');
        return;
      }
      if (!startCoords) {
        const loc = await Location.getCurrentPositionAsync({});
        setStartCoords([loc.coords.latitude, loc.coords.longitude]);
      }

      subscriber = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, distanceInterval: 5 },
        (location) => {
          setStartCoords([location.coords.latitude, location.coords.longitude]);
        }
      );
    })();

    return () => subscriber?.remove();
  }, []);

  // Geocode an address
  const geocodeAddress = async (address: string) => {
    try {
      const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(address)}&size=1`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates;
        return [lat, lng];
      } else {
        Alert.alert('Address not found', address);
        return null;
      }
    } catch (e) {
      Alert.alert('Geocoding error', String(e));
      return null;
    }
  };

  // Set start and destination coordinates
  const handleSetAddresses = async () => {
    let start = startCoords;
    if (startAddress) {
      const coords = await geocodeAddress(startAddress);
      if (!coords) return;
      start = coords;
      setStartCoords(coords);
    }

    const destCoords = await geocodeAddress(destinationAddress);
    if (!destCoords) return;
    setDestinationCoords(destCoords);
  };

  // Fetch route and extract instructions
  const fetchRoute = async () => {
    if (!startCoords || !destinationCoords) {
      Alert.alert('Start and destination coordinates required');
      return;
    }

    try {
      const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
      const body = { coordinates: [[startCoords[1], startCoords[0]], [destinationCoords[1], destinationCoords[0]]] };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': ORS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      const coords = data.features[0].geometry.coordinates.map((c: number[]) => ({
        latitude: c[1],
        longitude: c[0],
      }));
      setRouteCoords(coords);

      // Extract first instruction for display
      const steps = data.features[0].properties.segments[0].steps;
      if (steps && steps.length > 0) {
        const step = steps[0];
        setInstructions(`${step.instruction} (${Math.round(step.distance)} m)`);
      }
    } catch (e) {
      Alert.alert('Routing failed', String(e));
    }
  };

  const handleCenterMap = () => {
    if (mapRef.current && startCoords) {
      mapRef.current.animateToRegion({
        latitude: startCoords[0],
        longitude: startCoords[1],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleEndTrip = () => {
    setRouteCoords(null);
    setStartAddress('');
    setDestinationAddress('');
    setDestinationCoords(null);
    setInstructions('');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {startCoords && (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: startCoords[0],
            longitude: startCoords[1],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {startCoords && <Marker coordinate={{ latitude: startCoords[0], longitude: startCoords[1] }} title="Start" />}
          {destinationCoords && (
            <Marker coordinate={{ latitude: destinationCoords[0], longitude: destinationCoords[1] }} title="Destination" />
          )}
          {routeCoords && <Polyline coordinates={routeCoords} strokeColor="#1A4D2E" strokeWidth={5} />}
        </MapView>
      )}

      {/* Center button */}
      <TouchableOpacity style={styles.centerButton} onPress={handleCenterMap}>
        <Text style={{ color: '#fff' }}>Center</Text>
      </TouchableOpacity>

      {/* Turn-by-turn instructions */}
      {instructions ? (
        <View style={styles.instructionBox}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{instructions}</Text>
        </View>
      ) : null}

      {/* Bottom controls panel */}
      <View style={styles.controlsPanel}>
        <TextInput
          placeholder="Start address (optional, leave empty for GPS)"
          style={styles.input}
          value={startAddress}
          onChangeText={setStartAddress}
        />
        <TextInput
          placeholder="Destination address"
          style={styles.input}
          value={destinationAddress}
          onChangeText={setDestinationAddress}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.button} onPress={handleSetAddresses}>
            <Text style={{ color: '#fff' }}>Set Addresses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={fetchRoute}>
            <Text style={{ color: '#fff' }}>Show Route</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button, { marginTop: 10, backgroundColor: '#FF3B30' }]} onPress={handleEndTrip}>
          <Text style={{ color: '#fff' }}>End Trip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  controlsPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 10, flex: 1 },
  button: { backgroundColor: '#1A4D2E', padding: 12, borderRadius: 6, alignItems: 'center', flex: 1, marginHorizontal: 5 },
  centerButton: {
    position: 'absolute',
    top: 80,
    right: 10,
    backgroundColor: '#1A4D2E',
    padding: 12,
    borderRadius: 50,
    elevation: 5,
  },
  instructionBox: {
    position: 'absolute',
    top: 140,
    left: 10,
    right: 10,
    backgroundColor: '#1A4D2E',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
});
