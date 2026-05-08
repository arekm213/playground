package expo.modules.screenorientationexpomodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.res.Configuration
import android.content.ComponentCallbacks

class ScreenOrientationExpoModule : Module() {

  private var callbacks: ComponentCallbacks? = null
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ScreenOrientationExpoModule')` in JavaScript.
    Name("ScreenOrientationExpoModule")

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

    // Defines constant property on the module.
    Constant("PI") {
      Math.PI
    }

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    Function("getScreenOrientation") {
      val orientation = appContext.reactContext?.resources?.configuration?.orientation
      if(orientation == Configuration.ORIENTATION_PORTRAIT) "portrait" else "landscape"
    }

    Events("onScreenOrientationChange")
  }
}
