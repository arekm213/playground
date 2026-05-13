import type {CodegenTypes, TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export type KeyValuePair = {
  key: string,
  value: string,
}

export interface Spec extends TurboModule {
  getColorScheme(): string | null;

  readonly onSchemeChange: CodegenTypes.EventEmitter<KeyValuePair>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeAppearance',
);