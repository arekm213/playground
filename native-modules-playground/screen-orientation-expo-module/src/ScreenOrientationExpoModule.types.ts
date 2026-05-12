export type ScreenOrientationExpoModuleEvents = {
  onScreenOrientationChange: (params: OrientationChangeEventPayload) => void;
};

export type OrientationChangeEventPayload = {
  orientation: string;
};
