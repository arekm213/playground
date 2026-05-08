export type ScreenOrientationExpoModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
  onScreenOrientationChange: (params: OrientationChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type OrientationChangeEventPayload = {
  orientation: string;
};



