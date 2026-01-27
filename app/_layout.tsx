import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Stack,Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();
console.log("User in RootLayout:", user);
  const [isMounted, setIsMounted] = useState(false);

  // Run auth check once
  useEffect(() => {
    checkAuth();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = !!(user && token);

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    }

    if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [isMounted, user, token, segments]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}