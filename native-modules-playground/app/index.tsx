import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

import { useColorScheme, getColorScheme } from 'native-appearance';
import { useCallback } from 'react';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const getTheme = useCallback(() => {
    const colorScheme = getColorScheme();
    Alert.alert("colorScheme", `${colorScheme}`);
  }, [])

  return (
    <View style={styles.container}>
      <Text>Current theme: {colorScheme}</Text>
      <TouchableOpacity onPress={getTheme}><Text style={styles.item}>Get theme!</Text></TouchableOpacity>
      <Link href="/native-webview" style={styles.item}>Native WebView</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    paddingVertical: 14,
    fontSize: 16,
  },
});
