import { AnimatingNumbersExpoModuleView } from 'animating-numbers-expo-module';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useState } from 'react';

export default function App() {
  const [val, setVal] = useState(0);

  const increment = useCallback(() => {
    setVal((prev) => prev + 11.11);
  }, []);

  const decrement = useCallback(() => {
    setVal((prev) => prev - 11.11);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AnimatingNumbersExpoModuleView value={val} style={styles.view} />
        <TouchableOpacity onPress={increment}>
          <Text style={styles.action}>Increment by 11.11</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrement}>
          <Text style={styles.action}>Decrement by 11.11</Text>
        </TouchableOpacity>
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
    flex: 1,
    padding: 20,
  },
  view: {
    height: 200,
  },
  action: {
    color: 'blue',
    fontSize: 16,
    paddingVertical: 8,
  },
};
