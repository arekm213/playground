import * as React from 'react';

import { AnimatingNumbersExpoModuleViewProps } from './AnimatingNumbersExpoModule.types';

export default function AnimatingNumbersExpoModuleView(props: AnimatingNumbersExpoModuleViewProps) {
  return <div style={props.style as React.CSSProperties}>{props.value}</div>;
}
