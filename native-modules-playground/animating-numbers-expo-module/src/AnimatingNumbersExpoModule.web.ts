import { registerWebModule, NativeModule } from 'expo';

import { AnimatingNumbersExpoModuleEvents } from './AnimatingNumbersExpoModule.types';

class AnimatingNumbersExpoModule extends NativeModule<AnimatingNumbersExpoModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(AnimatingNumbersExpoModule, 'AnimatingNumbersExpoModule');
