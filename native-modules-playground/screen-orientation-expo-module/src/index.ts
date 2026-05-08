// Reexport the native module. On web, it will be resolved to ScreenOrientationExpoModule.web.ts
// and on native platforms to ScreenOrientationExpoModule.ts
export { default } from './ScreenOrientationExpoModule';
export * from  './ScreenOrientationExpoModule.types';
export { useScreenOrientation } from './useScreenOrientation';