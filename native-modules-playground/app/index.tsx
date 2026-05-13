import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      <TouchableOpacity onPress={getTheme}><Text>Get theme!</Text></TouchableOpacity>
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
