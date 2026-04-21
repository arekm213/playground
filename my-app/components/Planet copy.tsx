import { useEffect, type ReactNode } from 'react';
import { Image, type ImageSourcePropType, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

export type PlanetProps = {
  r: number;
  v1: number;
  v2: number;
  size: number;
  source?: ImageSourcePropType;
  component?: ReactNode;
};

export default function Planet({ size, source, component, r, v1, v2 }: PlanetProps) {
  const { width, height } = useWindowDimensions();

  const rMagicNumber = 23;

  const orbitingValue = useSharedValue(0);
  const rotatingPosValue = useSharedValue(0);

  useEffect(() => {
    if(v1 === 0 || v2 === 0){
        return;
    }

    orbitingValue.value = withRepeat(
        withTiming(2*Math.PI, { duration: 50000/v1, easing: Easing.linear }),
        -1, false
    );

    rotatingPosValue.value = withRepeat(
        withTiming(360, { duration: 50000/v2, easing: Easing.linear }),
        -1
    );
  }, []);

  const planetMovementStyle = useAnimatedStyle(() => {
    const cx = (width - size) / 2
    const x = cx + r * rMagicNumber * Math.cos(orbitingValue.value) - size / 2;
    const y = r * rMagicNumber * Math.sin(orbitingValue.value) - size / 2; 
    return {
        transform: [{ 
          translateX: x,
        },
        { 
          translateY: y
        },
        { rotateZ: `${rotatingPosValue.value}deg` }
      ],
    };
  });

  return (

      <Animated.View style={[
        { width: size, height: size, position: 'absolute'},
        planetMovementStyle
      ]}>
      {component ?? (source ? <Image source={source} style={{ width: size, height: size, borderRadius: size / 2 }} /> : null)}
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // overflow: 'hidden',
    position:'absolute',
    // transform: [{ rotateZ: '-110deg'}],
    // alignItems:'flex-end'
  },
});
