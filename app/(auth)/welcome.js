import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen() {
    const [page, setPage] = useState(0);
    const router = useRouter(); // Hook pour utiliser Expo Router

    const pages = [
        { text: "Bienvenue à MyApp!" },
        { text: "Découvrez toutes les fonctionnalités" },
        { text: "Prêt à commencer? Connectez-vous ou inscrivez-vous." }
    ];

    // Fonction pour définir 'welcome_page_see' dans AsyncStorage
    const setWelcomePageSeen = async () => {
        try {
            await AsyncStorage.setItem('welcome_page_see', 'true');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de welcome_page_see:', error);
        }
    };

    // Redirection vers la page login et stockage
    const handleLogin = async () => {
        await setWelcomePageSeen(); // Stocke que l'utilisateur a vu la page de bienvenue
        router.push("/login"); // Redirige vers la page login
    };

    // Redirection vers la page register et stockage
    const handleRegister = async () => {
        await setWelcomePageSeen(); // Stocke que l'utilisateur a vu la page de bienvenue
        router.push("/register"); // Redirige vers la page register
    };

    return (
        <View className='flex-1 items-center justify-center'>
            <Text>{pages[page].text}</Text>
            <View className='flex-row justify-between w-full px-4'>
                {page > 0 && (
                    <Button title="Previous" onPress={() => setPage(page - 1)} />
                )}
                {page < pages.length - 1 && (
                    <Button title="Next" onPress={() => setPage(page + 1)} />
                )}
            </View>
            {page === pages.length - 1 && (
                <View className='flex-row justify-between w-full px-4'>
                    {/* Bouton Login avec gestion du storage */}
                    <Button title="Login" onPress={handleLogin} />
                    {/* Bouton Register avec gestion du storage */}
                    <Button title="Register" onPress={handleRegister} />
                </View>
            )}
        </View>
    );
}
