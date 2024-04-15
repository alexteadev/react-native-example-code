import { Slot, SplashScreen, Stack } from "expo-router";
import { Colors } from "../shared/tokens";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";

// need for font load
SplashScreen.preventAutoHideAsync();

export default function RootRayout() {

    // for version 50+ you can load fonts via app.json (see documentation)
    const [loaded, error] = useFonts({
        'FiraSans-Regular': require('../assets/fonts/FiraSans-Regular.ttf'),
        'FiraSans-SemiBold': require('../assets/fonts/FiraSans-SemiBold.ttf'),
    });

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    statusBarColor: Colors.black,
                    contentStyle: {
                        backgroundColor: Colors.black,
                    },
                    headerShown: false,
                }}
            >
                <Stack.Screen name="login" />
                <Stack.Screen
                    name="restore"
                    options={{
                        presentation: 'modal',
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}