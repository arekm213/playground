import { NativeModule, requireNativeModule } from 'expo';

import { ScreenOrientationExpoModuleEvents } from './ScreenOrientationExpoModule.types';

declare class ScreenOrientationExpoModule extends NativeModule<ScreenOrientationExpoModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  getScreenOrientation(): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ScreenOrientationExpoModule>('ScreenOrientationExpoModule');
