import { memo, useEffect } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { ReactNode } from 'react';
import { squareToIndices } from './chessCoords';

type Props = {
  square: string;
  cellSize: number;
  resetCounter: number;
  onTap: (square: string) => void;
  onDragStart: (square: string) => void;
  onDragEnd: (square: string, toCi: number, toRi: number) => void;
  children: ReactNode;
};

function DraggablePiece({
  square,
  cellSize,
  resetCounter,
  onTap,
  onDragStart,
  onDragEnd,
  children,
}: Props) {
  const [fromCi, fromRi] = squareToIndices(square);
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  useEffect(() => {
    if (resetCounter > 0) {
      dragX.value = withSpring(0);
      dragY.value = withSpring(0);
    }
  }, [resetCounter]);

  const tap = Gesture.Tap()
    .maxDistance(5)
    .onEnd(() => {
      runOnJS(onTap)(square);
    });

  const pan = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      runOnJS(onDragStart)(square);
    })
    .onChange((event) => {
      dragX.value = event.translationX;
      dragY.value = event.translationY;
    })
    .onEnd((event) => {
      const cx = fromCi * cellSize + cellSize / 2 + event.translationX;
      const cy = fromRi * cellSize + cellSize / 2 + event.translationY;
      const toCi = Math.floor(cx / cellSize);
      const toRi = Math.floor(cy / cellSize);
      runOnJS(onDragEnd)(square, toCi, toRi);
    })
    .onFinalize(() => {
      isDragging.value = false;
    });

  const composed = Gesture.Race(pan, tap);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: dragX.value },
      { translateY: dragY.value },
      { scale: isDragging.value ? 1.5 : 1 },
    ],
    // zIndex: isDragging.value ? 10 : 1,
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={animStyle}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

export default memo(DraggablePiece);
