package expo.modules.animatingnumbersexpomodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class AnimatingNumbersExpoModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("AnimatingNumbersExpoModule")

    View(AnimatingNumbersExpoModuleView::class) {
      Prop("value") { view: AnimatingNumbersExpoModuleView, value: Double ->
        view.value = value
      }
    }
  }
}
