import { Alert, EventSubscription, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import NativeAppearance from '../specs/NativeAppearance';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useColorScheme = () => {
 const [colorScheme, setColorScheme] = useState<string | null>(NativeAppearance.getColorScheme());
 const listenerSubscription = useRef<null | EventSubscription>(null);

 useEffect(() => {
  const onSchemeChange = (pair: { key: string; value: string}) => {
    setColorScheme(pair.value);
  }
  listenerSubscription.current = NativeAppearance?.onSchemeChange(onSchemeChange);
  return  () => {
    listenerSubscription.current?.remove();
    listenerSubscription.current = null;
  }
 }, [])
 return colorScheme
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const getTheme = useCallback(() => {
    const colorScheme = NativeAppearance.getColorScheme();
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
