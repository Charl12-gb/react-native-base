import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../redux/utils/hooks.js';
import Toast from 'react-native-toast-message';
import { setCredentials } from '../redux/features/auth/authSlice.js';
import { localStorage } from '../redux/utils/localStorage.js';
import { clearMessage } from '../redux/features/alert/alertSlice.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext(null);

export function useAuth() {
    return React.useContext(AuthContext);
}

const useProtectedRoute = () => {
    const segments = useSegments();
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        const checkProtectedRoute = async () => {
            try {
                const welcomePageSeen = await AsyncStorage.getItem('welcome_page_see');
                const inAuthGroup = segments[0] === '(auth)';
                const inAppGroup = segments[0] === '(tabs)';

                if (!welcomePageSeen) {
                    router.replace('/welcome');
                    console.log('Redirecting to welcome page');
                } else if (!token && !inAuthGroup) {
                    router.replace('/login');
                    console.log('Redirecting to login');
                } else if (token && !inAppGroup) {
                    router.replace('/home');
                    console.log('Authorized route');
                }
            } catch (error) {
                console.error('Error checking protected route:', error);
            }
        };

        checkProtectedRoute();
    }, [token, segments, router]);
};

export function AuthProvider(props) {
    const dispatch = useAppDispatch();
    const type = useAppSelector((state) => state.alert.type);
    const message = useAppSelector((state) => state.alert.message);
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const access_token = await localStorage.getItem('token');
                if (access_token) {
                    dispatch(setCredentials({ access_token }));
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        };

        refreshToken();
    }, [dispatch]);

    useEffect(() => {
        if (type && message) {
            show(type, message);
        }
    }, [type, message]);

    const show = (type, message) => {
        Toast.show({
            type: type,
            position: 'top',
            text1: '',
            text2: message,
            visibilityTime: 5000,
            autoHide: true,
            topOffset: 20,
            bottomOffset: 40,
            onHide: () => {
                dispatch(clearMessage());
            },
        });
    };

    useProtectedRoute();

    return (
        <AuthContext.Provider value={null}>
            {props.children}
        </AuthContext.Provider>
    );
}