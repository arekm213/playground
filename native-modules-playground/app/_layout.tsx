import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Screens' }} />
      <Stack.Screen name="use-screen-orientation" options={{ title: 'Use Screen Orientation' }} />
      <Stack.Screen name="native-webview" options={{ title: 'Native WebView' }} />
    </Stack>
  );
}
