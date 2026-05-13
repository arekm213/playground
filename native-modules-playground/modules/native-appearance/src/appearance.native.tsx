import { EventSubscription } from 'react-native';
import NativeColorScheme, { ColorScheme, KeyValuePair } from './NativeColorScheme';

export function getColorScheme(): ColorScheme | null {
  return NativeColorScheme.getColorScheme();
}

export function onSchemeChange(handler: (arg: KeyValuePair) => void): EventSubscription {
  return NativeColorScheme.onSchemeChange(handler);
}
