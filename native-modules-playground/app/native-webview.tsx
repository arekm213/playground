import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { NativeWebviewView } from 'react-native-native-webview';

const INITIAL = 'https://reactnative.dev';

export default function NativeWebviewScreen() {
  const [draft, setDraft] = useState(INITIAL);
  const [url, setUrl] = useState(INITIAL);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />
        <Button title="Load" onPress={() => setUrl(draft)} />
      </View>
      <NativeWebviewView
        style={styles.webview}
        sourceURL={url}
        onScriptLoaded={() => Alert.alert('pageLoaded')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: {
    flexDirection: 'row',
    padding: 8,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 4,
    marginRight: 8,
  },
  webview: { flex: 1 },
});
