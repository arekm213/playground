import { EventSubscription } from 'react-native';
import NativeAppearance, { ColorScheme, KeyValuePair } from './NativeAppearance';

export function getColorScheme(): ColorScheme | null {
  return NativeAppearance.getColorScheme();
}

export function onSchemeChange(handler: (arg: KeyValuePair) => void): EventSubscription {
  return NativeAppearance?.onSchemeChange(handler);
}
