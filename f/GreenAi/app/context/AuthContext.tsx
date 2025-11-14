// context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'; 
import { onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs, query, limit } from "firebase/firestore";
import { auth, db } from '../firebaseConfig'; 

// Define User Role Type
type UserRole = 'admin' | 'driver' | 'unassigned' | null;
type UserStatus = 'pending' | 'active' | 'unassigned' | null;

interface AuthContextType {
    user: FirebaseAuthUser | null;
    role: UserRole;
    status: UserStatus; // NEW STATUS FIELD
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<FirebaseAuthUser | null>(null);
    const [role, setRole] = useState<UserRole>('unassigned');
    const [status, setAuthStatus] = useState<UserStatus>('unassigned'); // Initialize new status field
    const [loading, setLoading] = useState(true);

    // Helper to check if any user documents exist in Firestore
    const isFirstUser = async () => {
        try {
            const snapshot = await getDocs(query(collection(db, "users"), limit(1)));
            return snapshot.empty;
        } catch (e) {
            console.error("Error checking user collection:", e);
            return false;
        }
    };

    // Function to fetch or assign the user's role and status from Firestore
    const fetchUserRole = useCallback(async (uid: string, userEmail: string | null) => {
        if (!userEmail) {
            setRole('unassigned');
            setAuthStatus('unassigned');
            setLoading(false);
            return;
        }

        try {
            const userRef = doc(db, "users", uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                // User data exists: use the stored role and status
                const userData = docSnap.data();
                setRole(userData.role || 'driver');
                setAuthStatus(userData.status || 'pending'); // Use stored status
            } else {
                // User is brand new (exists only in FirebaseAuth): Determine and assign initial role
                const isOwner = await isFirstUser();
                let assignedRole: UserRole = 'driver'; 
                let assignedStatus: UserStatus = 'pending'; 
                
                if (isOwner) {
                    assignedRole = 'admin';
                    assignedStatus = 'active'; // Owner is immediately active
                }
                
                // Create the user document with the determined role and status
                await setDoc(userRef, {
                    uid: uid,
                    email: userEmail,
                    role: assignedRole, 
                    status: assignedStatus, 
                    createdAt: new Date(),
                });
                
                setRole(assignedRole);
                setAuthStatus(assignedStatus);
            }
        } catch (error) {
            console.error("Error fetching or assigning user role:", error);
            setRole(null); 
            setAuthStatus(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Main Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setLoading(true);
                fetchUserRole(currentUser.uid, currentUser.email); 
            } else {
                setRole('unassigned');
                setAuthStatus('unassigned');
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [fetchUserRole]);

    const value = { user, role, status, loading }; // Export status

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#1A4D2E" />
                <Text style={{ marginTop: 10 }}>Loading Session and Role...</Text>
            </View>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};