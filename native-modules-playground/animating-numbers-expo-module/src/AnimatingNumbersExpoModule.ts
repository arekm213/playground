import { NativeModule, requireNativeModule } from 'expo';

import { AnimatingNumbersExpoModuleEvents } from './AnimatingNumbersExpoModule.types';

declare class AnimatingNumbersExpoModule extends NativeModule<AnimatingNumbersExpoModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<AnimatingNumbersExpoModule>('AnimatingNumbersExpoModule');
