import type { NativeSyntheticEvent, ViewProps } from 'react-native';

type WebViewScriptLoadedEvent = {
  result: 'success' | 'error';
};

type Props = ViewProps & {
  sourceURL?: string;
  onScriptLoaded?: (
    event: NativeSyntheticEvent<WebViewScriptLoadedEvent>
  ) => void;
};

export function NativeWebviewView(_props: Props): never {
  throw new Error(
    "'react-native-native-webview' is only supported on native platforms."
  );
}
