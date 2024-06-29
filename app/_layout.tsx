import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

import "./global.css"
import { storage } from "@/components/store/store";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Mulish-Black": require("../assets/fonts/Mulish-Black.ttf"),
    "Mulish-ExtraBold": require("../assets/fonts/Mulish-ExtraBold.ttf"),
    "Mulish-Italic": require("../assets/fonts/Mulish-Italic.ttf"),
    "Mulish-Medium": require("../assets/fonts/Mulish-Medium.ttf"),
    "Mulish-Regular": require("../assets/fonts/Mulish-Regular.ttf"),
    "Mulish-SemiBold": require("../assets/fonts/Mulish-SemiBold.ttf"),
    ...FontAwesome.font,
  });
  const getMenuAndSave = async () => {
    const request = await fetch(process.env.EXPO_PUBLIC_API_URL as string);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = await request.json();

    if (request.status === 200) {
      const { content } = response;
      delete content.a;
      delete content.n;

      storage.set("user.menu", JSON.stringify(content));
    } else {
    }
  };
  useEffect(() => {
    (async () => {
      const getUserMenu = await storage.getString("user.menu");
      if (!getUserMenu) {
        await getMenuAndSave();
      }
      // console.log("getUserMenu : ", getUserMenu);
    })();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
