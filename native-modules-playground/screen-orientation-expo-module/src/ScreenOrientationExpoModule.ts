import { NativeModule, requireNativeModule } from 'expo';

import { ScreenOrientation, ScreenOrientationExpoModuleEvents } from './ScreenOrientationExpoModule.types';

declare class ScreenOrientationExpoModule extends NativeModule<ScreenOrientationExpoModuleEvents> {
  getScreenOrientation(): ScreenOrientation;
}

export default requireNativeModule<ScreenOrientationExpoModule>('ScreenOrientationExpoModule');
