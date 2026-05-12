import { NativeModule, requireNativeModule } from 'expo';

import { ScreenOrientationExpoModuleEvents } from './ScreenOrientationExpoModule.types';

declare class ScreenOrientationExpoModule extends NativeModule<ScreenOrientationExpoModuleEvents> {
  getScreenOrientation(): string;
}

export default requireNativeModule<ScreenOrientationExpoModule>('ScreenOrientationExpoModule');
