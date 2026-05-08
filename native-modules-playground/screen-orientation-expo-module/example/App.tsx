import { useEvent } from 'expo';
import ScreenOrientationExpoModule, { useScreenOrientation } from 'screen-orientation-expo-module';
import { Alert, Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useEffect } from 'react';

export default function App() {
  const onChangePayload = useEvent(ScreenOrientationExpoModule, 'onChange');

  const screenOrientation = useScreenOrientation();

  useEffect(()=>{
    Alert.alert("Screen orientation", `${screenOrientation}`)
    screenOrientation
  }, [screenOrientation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Constants">
          <Text>{ScreenOrientationExpoModule.PI}</Text>
        </Group>
        <Group name="Functions">
          <Text>{ScreenOrientationExpoModule.hello()}</Text>
        </Group>
        <Group name="Async functions">
          <Button
            title="Set value"
            onPress={async () => {
              await ScreenOrientationExpoModule.setValueAsync('Hello from JS!');
            }}
          />
        </Group>
        <Group name="Events">
          <Text>{onChangePayload?.value}</Text>
        </Group>
        <Group name="Get orientation">
          <Button
            title="Get value"
            onPress={async () => {
              Alert.alert("Orientation", `Orientation is ${ScreenOrientationExpoModule.getScreenOrientation()}`)
            }}
          />
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
};
