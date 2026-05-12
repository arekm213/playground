import { useScreenOrientation } from 'screen-orientation-expo-module';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { useEffect } from 'react';

export default function App() {
  const screenOrientation = useScreenOrientation();

  useEffect(() => {
    Alert.alert('Screen orientation', `${screenOrientation}`);
  }, [screenOrientation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Current orientation</Text>
        <Text style={styles.value}>{screenOrientation}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 12,
  },
  value: {
    fontSize: 30,
  },
};
