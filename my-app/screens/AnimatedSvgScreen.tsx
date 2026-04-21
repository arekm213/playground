import { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function AnimatedSvgScreen() {
  const { width, height } = useWindowDimensions();
  const lineLength = width * 0.5;
  const startX = (width - lineLength) / 2;
  const endX = startX + lineLength;
  const y = height / 2;
  const circleRadius = Math.round((endX - startX) / 2)

  const progress = useSharedValue(0);
  useEffect(() => {
    setTimeout(() => {
      progress.value = withTiming(1, {duration: 2000});
    }, 2000)
  }, []);

  const NUM_POINTS = 60;
  const cx = startX + circleRadius;

  const animatedProps = useAnimatedProps(() => {
    const p = progress.value;
    let d = '';
    for (let i = 0; i < NUM_POINTS; i++) {
      const t = i / (NUM_POINTS - 1);
      const lineX = startX + (endX - startX) * t;
      const angle = Math.PI / 2 + 2 * Math.PI * t;
      const circleX = cx + circleRadius * Math.cos(angle);
      const circleY = y + circleRadius * Math.sin(angle);
      const px = lineX + (circleX - lineX) * p;
      const py = y + (circleY - y) * p;
      d += i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`;
    }
    return { d };
  })

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <AnimatedPath stroke="red" strokeWidth={4} 
        animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});