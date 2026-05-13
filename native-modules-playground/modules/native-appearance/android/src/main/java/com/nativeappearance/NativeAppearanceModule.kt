package com.nativeappearance

import com.facebook.react.bridge.ReactApplicationContext

class NativeAppearanceModule(reactContext: ReactApplicationContext) :
  NativeNativeAppearanceSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeNativeAppearanceSpec.NAME
  }
}
