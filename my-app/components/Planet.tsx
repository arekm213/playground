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
  // const positionStyle = {
  //   position: 'absolute',
  //   justifyContent: 'center', 
  //   alignItems: 'center',
  // }r
  const radius = r * 23

  const orbitingPosValue = useSharedValue(0);
  const rotatingPosValue = useSharedValue(0);

  useEffect(() => {
    if(v1 === 0 || v2 === 0){
        return;
    }

    orbitingPosValue.value = withRepeat(
        withTiming(360, { duration: 50_000/v1, easing: Easing.linear }),
        -1
    );

    rotatingPosValue.value = withRepeat(
        withTiming(360, { duration: 50_000/v2, easing: Easing.linear }),
        -1
    );
  }, []);

  const orbitingStyle = useAnimatedStyle(() => {
    return {
        transform: [
          { rotateZ: `${orbitingPosValue.value}deg` },
          {translateX: radius},
          { rotateZ: `${rotatingPosValue.value}deg`}
          
        ],
    };
  });

  const disableOrbitingAnimation = v1 === 0;

  return (
      <Animated.View style={[
        { width: size, height: size, position:'absolute'},
        orbitingStyle
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
