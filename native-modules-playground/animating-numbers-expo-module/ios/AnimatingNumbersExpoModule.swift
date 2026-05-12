import ExpoModulesCore

public class AnimatingNumbersExpoModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AnimatingNumbersExpoModule")

    View(AnimatingNumbersExpoModuleView.self) {
      Prop("value") { (view: AnimatingNumbersExpoModuleView, value: Double) in
        view.model.value = value
      }
    }
  }
}
