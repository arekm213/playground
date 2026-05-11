// Reexport the native module. On web, it will be resolved to AnimatingNumbersExpoModule.web.ts
// and on native platforms to AnimatingNumbersExpoModule.ts
export { default } from './AnimatingNumbersExpoModule';
export { default as AnimatingNumbersExpoModuleView } from './AnimatingNumbersExpoModuleView';
export * from  './AnimatingNumbersExpoModule.types';
