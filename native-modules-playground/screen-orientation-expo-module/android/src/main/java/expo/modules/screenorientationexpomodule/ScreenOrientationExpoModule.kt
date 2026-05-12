package expo.modules.screenorientationexpomodule

import android.content.ComponentCallbacks
import android.content.res.Configuration
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ScreenOrientationExpoModule : Module() {

  private var callbacks: ComponentCallbacks? = null

  override fun definition() = ModuleDefinition {
    Name("ScreenOrientationExpoModule")

    Events("onScreenOrientationChange")

    OnCreate {
      val context = appContext.reactContext ?: return@OnCreate

      val cb = object : ComponentCallbacks {
        override fun onConfigurationChanged(newConfig: Configuration) {
          val orientation = if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE)
            "landscape" else "portrait"
          sendEvent("onScreenOrientationChange", mapOf("orientation" to orientation))
        }
        override fun onLowMemory() {}
      }

      context.registerComponentCallbacks(cb)
      callbacks = cb
    }

    OnDestroy {
      callbacks?.let {
        appContext.reactContext?.unregisterComponentCallbacks(it)
      }
      callbacks = null
    }

    Function("getScreenOrientation") {
      val orientation = appContext.reactContext?.resources?.configuration?.orientation
      if (orientation == Configuration.ORIENTATION_PORTRAIT) "portrait" else "landscape"
    }
  }
}
