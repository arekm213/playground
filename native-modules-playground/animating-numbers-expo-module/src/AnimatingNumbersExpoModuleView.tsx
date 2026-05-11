import { requireNativeView } from 'expo';
import * as React from 'react';

import { AnimatingNumbersExpoModuleViewProps } from './AnimatingNumbersExpoModule.types';

const NativeView: React.ComponentType<AnimatingNumbersExpoModuleViewProps> =
  requireNativeView('AnimatingNumbersExpoModule');

export default function AnimatingNumbersExpoModuleView(props: AnimatingNumbersExpoModuleViewProps) {
  return <NativeView {...props} />;
}
