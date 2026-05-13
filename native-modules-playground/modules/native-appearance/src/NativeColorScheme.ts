import type {CodegenTypes, TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export type KeyValuePair = {
  key: string,
  value: ColorScheme,
}

export type ColorScheme = 'dark' | 'light'

export interface Spec extends TurboModule {
  getColorScheme(): ColorScheme | null;

  readonly onSchemeChange: CodegenTypes.EventEmitter<KeyValuePair>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'ColorScheme',
);