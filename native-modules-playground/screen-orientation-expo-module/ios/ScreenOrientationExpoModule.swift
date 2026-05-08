import ExpoModulesCore

public class ScreenOrientationExpoModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ScreenOrientationExpoModule')` in JavaScript.
    Name("ScreenOrientationExpoModule")

    // Defines constant property on the module.
    Constant("PI") {
      Double.pi
    }

    OnCreate {
        UIDevice.current.beginGeneratingDeviceOrientationNotifications()
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(self.handleOrientationChange),
            name: UIDevice.orientationDidChangeNotification,
            object: nil
        )
    }

    OnDestroy {
        NotificationCenter.default.removeObserver(
            self,
            name: UIDevice.orientationDidChangeNotification,
            object: nil
        )
        UIDevice.current.endGeneratingDeviceOrientationNotifications()
    }

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    Function("getScreenOrientation") {
      let scene = UIApplication.shared.connectedScenes
        .first { $0.activationState == .foregroundActive } as? UIWindowScene
      let orientation = scene?.interfaceOrientation ?? .portrait
      return orientation.isLandscape ? "landscape" : "portrait"
    }

    Events("onScreenOrientationChange")
  }

  @objc private func handleOrientationChange() {
      let orientation = UIDevice.current.orientation
      let value = orientation.isLandscape ? "landscape" : "portrait"
      sendEvent("onScreenOrientationChange", ["orientation": value])
  }
}