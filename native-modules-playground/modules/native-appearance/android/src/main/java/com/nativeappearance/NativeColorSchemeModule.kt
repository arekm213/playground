package com.nativeappearance

import android.content.ComponentCallbacks
import android.content.res.Configuration
import com.facebook.fbreact.specs.NativeColorSchemeSpec
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext

class NativeColorSchemeModule(reactContext: ReactApplicationContext) :
  NativeColorSchemeSpec(reactContext), LifecycleEventListener {

  private var lastScheme: String? = readColorScheme()

  private val configurationListener = object : ComponentCallbacks {
    override fun onConfigurationChanged(newConfig: Configuration) {
      val next = mapUiMode(newConfig.uiMode)
      if (next != null && next != lastScheme) {
        lastScheme = next
        val payload = Arguments.createMap().apply {
          putString("key", "theme")
          putString("value", next)
        }
        emitOnSchemeChange(payload)
      }
    }

    override fun onLowMemory() {}
  }

  init {
    reactContext.applicationContext.registerComponentCallbacks(configurationListener)
    reactContext.addLifecycleEventListener(this)
  }

  override fun getColorScheme(): String? = readColorScheme()

  override fun onHostResume() {}
  override fun onHostPause() {}
  override fun onHostDestroy() {
    reactApplicationContext.applicationContext.unregisterComponentCallbacks(configurationListener)
    reactApplicationContext.removeLifecycleEventListener(this)
  }

  private fun readColorScheme(): String? =
    mapUiMode(reactApplicationContext.resources.configuration.uiMode)

  private fun mapUiMode(uiMode: Int): String? =
    when (uiMode and Configuration.UI_MODE_NIGHT_MASK) {
      Configuration.UI_MODE_NIGHT_YES -> "dark"
      Configuration.UI_MODE_NIGHT_NO -> "light"
      else -> null
    }

  companion object {
    const val NAME = NativeColorSchemeSpec.NAME
  }
}
