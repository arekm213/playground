import type { ReactNode } from 'react';
import { Image, type ImageSourcePropType, StyleSheet, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';

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
  // }
  const leftPosition = (width - size)/2 + r * 23

  const orbiting = {
      '0%': {
        transform: [{ rotateZ: '0deg' }],
      },
      '100%': {
        transform: [{ rotateZ: '360deg' }],
      },
  };

  const rotating = {
      '0%': {
        transform: [{ rotateZ: '0deg' }],
      },
      '100%': {
        transform: [{ rotateZ: '360deg' }],
      },
  }

  const disableOrbitingAnimation = v1 === 0;

  return (
    <Animated.View style={[
      styles.wrapper,
      { 
        width: width,
        height: size
      },
      disableOrbitingAnimation ? {} : {
        animationName: orbiting,
        animationDuration: `${100/v1}s`,
        animationIterationCount: 'infinite',
        animationDirection: 'normal',
        animationTimingFunction: 'linear',
      },
      ]}>
      <Animated.View style={[
        {marginLeft: leftPosition, width: size, height: size},
        {
          animationName: rotating,
          animationDuration: `${100/v2}s`,
          animationIterationCount: 'infinite',
          animationDirection: 'normal',
          animationTimingFunction: 'linear',
        }
      ]}>
      {component ?? (source ? <Image source={source} style={{ width: size, height: size, borderRadius: size / 2 }} /> : null)}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    position:'absolute',
    // transform: [{ rotateZ: '-110deg'}],
    // alignItems:'flex-end'
  },
});
