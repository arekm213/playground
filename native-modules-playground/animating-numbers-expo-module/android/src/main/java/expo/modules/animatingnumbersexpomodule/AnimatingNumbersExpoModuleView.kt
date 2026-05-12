package expo.modules.animatingnumbersexpomodule

import android.content.Context
import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import java.text.DecimalFormat
import java.text.DecimalFormatSymbols
import java.text.NumberFormat
import java.util.Locale
import androidx.compose.animation.EnterExitState
import androidx.compose.animation.core.animateDp
import androidx.compose.animation.core.keyframes
import androidx.compose.ui.draw.blur


data class Digit(val digitChar: Char, val fullNumber: Double, val place: Int) {
    override fun equals(other: Any?): Boolean {
        return when (other) {
            is Digit -> digitChar == other.digitChar
            else -> super.equals(other)
        }
    }
}

operator fun Digit.compareTo(other: Digit): Int {
    return fullNumber.compareTo(other.fullNumber)
}

private val currencyFormatter: NumberFormat =
    DecimalFormat("#,##0.00 '$'", DecimalFormatSymbols(Locale("pl", "PL")))

class AnimatingNumbersExpoModuleView(context: Context, appContext: AppContext) :
  ExpoView(context, appContext) {

  var value by mutableStateOf(0.0)

  private val composeView = ComposeView(context).apply {
    setViewCompositionStrategy(
        ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed
    )
    layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    setContent {
        Row(
            modifier = Modifier
                .animateContentSize()
                .padding(horizontal = 32.dp),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            val currentValue = value
            currencyFormatter.format(currentValue)
                .mapIndexed { index, c -> Digit(c, currentValue, index) }
                .forEach { digit ->
                    AnimatedContent(
                        targetState = digit,
                        transitionSpec = {
                            if (targetState > initialState) {
                                slideInVertically { -it } togetherWith slideOutVertically { it }
                            } else {
                                slideInVertically { it } togetherWith slideOutVertically { -it }
                            }
                        }
                    ) { animatedDigit ->
                        val blurRadius by transition.animateDp(
                            label = "blur",
                            transitionSpec = {
                                keyframes {
                                    durationMillis = 300
                                    8.dp at 100
                                    8.dp at 200
                                }
                            }
                        ) { state ->
                            if (state == EnterExitState.Visible) 0.dp else 8.dp
                        }
                        Text(
                            "${animatedDigit.digitChar}",
                            modifier = Modifier.blur(blurRadius),
                            style = MaterialTheme.typography.displayLarge,
                            textAlign = TextAlign.Center,
                        )
                    }
                }
        }
    }
  }

  init {
    addView(composeView)
  }
}
