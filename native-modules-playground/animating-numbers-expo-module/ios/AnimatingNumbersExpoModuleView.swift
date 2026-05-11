import ExpoModulesCore
import SwiftUI

class CurrencyModel: ObservableObject {
  @Published var value: Double = 0
}

@available(iOS 17.0, *)
struct IncrementingCurrencyView: View {

  @ObservedObject var model: CurrencyModel

  var currencyFormater: NumberFormatter = {
    var formatter = NumberFormatter()
    formatter.numberStyle = .currency
    formatter.currencySymbol = "$"
    return formatter
  }()

  var body: some View {
    VStack {
      Text("\(currencyFormater.string(from: model.value as NSNumber)!)")
        .contentTransition(.numericText(value: model.value))
        .font(.largeTitle)
        .bold()
    }
  }

  func incrementValue(with amount: Double) {
    withAnimation {
      model.value += amount
    }
  }
}

class AnimatingNumbersExpoModuleView: ExpoView {
  let model = CurrencyModel()
  var hostingController: UIViewController?
  let onLoad = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    if #available(iOS 17.0, *) {
      let hc = UIHostingController(rootView: IncrementingCurrencyView(model: model))
      hc.view.backgroundColor = .clear
      addSubview(hc.view)
      hostingController = hc
    }
  }

  override func layoutSubviews() {
    hostingController?.view.frame = bounds
  }
}
