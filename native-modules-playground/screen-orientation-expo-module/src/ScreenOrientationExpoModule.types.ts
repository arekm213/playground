export type ScreenOrientation = 'portrait' | 'landscape';

export type ScreenOrientationExpoModuleEvents = {
  onScreenOrientationChange: (params: OrientationChangeEventPayload) => void;
};

export type OrientationChangeEventPayload = {
  orientation: ScreenOrientation;
};
