import { useEvent } from 'expo';
import AnimatingNumbersExpoModule, { AnimatingNumbersExpoModuleView } from 'animating-numbers-expo-module';
import { Button, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useState } from 'react';

export default function App() {
  const onChangePayload = useEvent(AnimatingNumbersExpoModule, 'onChange');

  const [val, setVal] = useState(0);

  const increment = useCallback(()=>{
    setVal((prev)=>prev+11.11);
  }, [setVal])

  const decrement = useCallback(()=>{
    setVal((prev)=>prev-11.11);
  }, [setVal])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Constants">
          <Text>{AnimatingNumbersExpoModule.PI}</Text>
        </Group>
        <Group name="Functions">
          <Text>{AnimatingNumbersExpoModule.hello()}</Text>
        </Group>
        <Group name="Async functions">
          <Button
            title="Set value"
            onPress={async () => {
              await AnimatingNumbersExpoModule.setValueAsync('Hello from JS!');
            }}
          />
        </Group>
        <Group name="Events">
          <Text>{onChangePayload?.value}</Text>
        </Group>
        <Group name="Views">
          <AnimatingNumbersExpoModuleView
            value={val}
            style={styles.view}
          />
          <TouchableOpacity onPress={increment}><Text style={{color:'blue'}}>Increment by 11.11</Text></TouchableOpacity>
          <TouchableOpacity onPress={decrement}><Text style={{color:'blue'}}>Decrement by 11.11</Text></TouchableOpacity>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
