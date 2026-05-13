import ExpoModulesCore

public class ScreenOrientationExpoModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ScreenOrientationExpoModule")

    Events("onScreenOrientationChange")

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

    Function("getScreenOrientation") {
      return currentOrientation()
    }
  }

  @objc private func handleOrientationChange() {
    sendEvent("onScreenOrientationChange", ["orientation": currentOrientation()])
  }

  private func currentOrientation() -> String {
    let scene = UIApplication.shared.connectedScenes
      .first { $0.activationState == .foregroundActive } as? UIWindowScene
    let orientation = scene?.interfaceOrientation ?? .portrait
    return orientation.isLandscape ? "landscape" : "portrait"
  }
}
