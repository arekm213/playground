package com.nativewebview

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.NativeWebviewViewManagerInterface
import com.facebook.react.viewmanagers.NativeWebviewViewManagerDelegate

@ReactModule(name = NativeWebviewViewManager.NAME)
class NativeWebviewViewManager : SimpleViewManager<NativeWebviewView>(),
  NativeWebviewViewManagerInterface<NativeWebviewView> {
  private val mDelegate: ViewManagerDelegate<NativeWebviewView>

  init {
    mDelegate = NativeWebviewViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<NativeWebviewView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): NativeWebviewView {
    return NativeWebviewView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: NativeWebviewView?, color: Int?) {
    view?.setBackgroundColor(color ?: Color.TRANSPARENT)
  }

  companion object {
    const val NAME = "NativeWebviewView"
  }
}
