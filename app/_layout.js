import React from 'react';
import { Slot } from "expo-router";
import {Provider} from "react-redux";
import Toast from 'react-native-toast-message';
import { AuthProvider } from '../src/context/auth';
import { store } from '../src/redux/store/index.js'
import { toastConfig } from '../src/config/toastConfig';

export {
    ErrorBoundary,
} from 'expo-router';

export default function Root() {

    return (
        <>
            <Provider store={store}>
                <>
                    <AuthProvider>
                        <Slot />
                    </AuthProvider>
                </>
            </Provider>
            <Toast config={toastConfig}/>
        </>
    );
}
