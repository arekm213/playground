import type { ColorValue, ViewProps } from 'react-native';

type Props = ViewProps & {
  color?: ColorValue;
};

export function NativeWebviewView(_props: Props): never {
  throw new Error(
    "'react-native-native-webview' is only supported on native platforms."
  );
}
