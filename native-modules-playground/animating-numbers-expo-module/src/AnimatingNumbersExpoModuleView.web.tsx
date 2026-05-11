import * as React from 'react';

import { AnimatingNumbersExpoModuleViewProps } from './AnimatingNumbersExpoModule.types';

export default function AnimatingNumbersExpoModuleView(props: AnimatingNumbersExpoModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
