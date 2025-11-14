// app/(auth)/login.tsx (Email/Password Login)

import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router'; 
import { auth } from '../firebaseConfig'; 
// Firestore imports are removed as they are now only used in AuthContext

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null); 
    const router = useRouter(); 

    const handleAuthError = (error: any) => {
        setLoading(false);
        let message = "An error occurred.";
        if (error.code) {
            message = error.code.replace('auth/', '').replace(/-/g, ' ');
        }
        setErrorMessage(message);
    }

    const signIn = async () => {
        setLoading(true); setErrorMessage(null);
        try {
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim(); 
            const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
            // On success, AuthContext takes over to fetch the role/status and RootGuard redirects.
        } catch (error: any) {
            handleAuthError(error);
        }
    }

    const signUp = async () => {
        setLoading(true); setErrorMessage(null);
        try {
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
            
            // AuthContext now automatically handles the role assignment (Owner/Pending) in Firestore.
            
            // On success, AuthContext takes over to fetch the role/status and RootGuard redirects.
        } catch (error: any) {
            handleAuthError(error);
        }
    }

    const isFormValid = email.length > 0 && password.length >= 6;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>GreenRoute-AI Login</Text>
            {errorMessage && (<View style={styles.errorBox}><Text style={styles.errorText}>🛑 {errorMessage}</Text></View>)}
            
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} editable={!loading}/>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} editable={!loading}/>
            
            <TouchableOpacity style={[styles.button, (!isFormValid || loading) && styles.buttonDisabled]} onPress={signIn} disabled={!isFormValid || loading}>
                {loading ? (<ActivityIndicator color="#fff" />) : (<Text style={styles.buttonText}>Login</Text>)}
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonAlt, (!isFormValid || loading) && styles.buttonAltDisabled]} onPress={signUp} disabled={!isFormValid || loading}>
                <Text style={styles.buttonTextAlt}>Create Account</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 25, backgroundColor: '#F7F9FC', justifyContent: 'center', },
    headerText: { fontSize: 32, fontWeight: '700', marginBottom: 40, textAlign: 'center', color: '#1A4D2E', },
    input: { height: 55, borderColor: '#E0E6ED', borderWidth: 1, marginBottom: 18, paddingHorizontal: 15, borderRadius: 10, backgroundColor: '#fff', fontSize: 16, },
    errorBox: { backgroundColor: '#fee2e2', padding: 10, borderRadius: 8, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#ef4444', },
    errorText: { color: '#ef4444', fontWeight: '600', },
    button: { backgroundColor: '#1A4D2E', padding: 18, borderRadius: 10, alignItems: 'center', marginBottom: 10, },
    buttonDisabled: { backgroundColor: '#95B89B', },
    buttonAlt: { backgroundColor: 'transparent', padding: 18, borderRadius: 10, alignItems: 'center', borderWidth: 2, borderColor: '#1A4D2E', },
    buttonAltDisabled: { opacity: 0.5, },
    buttonText: { color: '#fff', fontWeight: '700', fontSize: 18, },
    buttonTextAlt: { color: '#1A4D2E', fontWeight: '700', fontSize: 18, },
});

export default LoginScreen;