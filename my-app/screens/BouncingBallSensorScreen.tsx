import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Ball, { BALL_SIZE } from '../components/Ball';
import Animated, { SensorType, useAnimatedReaction, useAnimatedSensor, useAnimatedStyle, useSharedValue, withDecay } from 'react-native-reanimated';
import { useEffect } from 'react';
import { runOnUISync } from 'react-native-worklets';
import { useHeaderHeight } from '@react-navigation/elements';

export default function BouncingBallSensorScreen() {
  const {width, height} = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const accelerometerData = useAnimatedSensor(SensorType.ACCELEROMETER)
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const velX = useSharedValue(0);
  const velY = useSharedValue(0);

    const velLossOnBounce = 0.9;

    useAnimatedReaction(
      () => {
        return posX.value;
      },
      (currentValue, previousValue) => {
        if (currentValue >= width - BALL_SIZE) {
          velX.value = -Math.abs(velX.value)*velLossOnBounce
        }
        if (currentValue <= 0){
          velX.value = Math.abs(velX.value)*velLossOnBounce
        }
      },
      [width]
    );
  
    useAnimatedReaction(
      () => {
        return posY.value;
      },
      (currentValue, previousValue) => {
        if (currentValue >= height - BALL_SIZE - headerHeight) {
          velY.value = -Math.abs(velY.value)*velLossOnBounce
        }
        if (currentValue <= 0){
          velY.value = Math.abs(velY.value)*velLossOnBounce
        }
      },
      [height, headerHeight]
    );


  useEffect(()=>{
    const worklet = () => {
      "worklet"
      const velMultiplier = 0.5;
      accelerometerData.sensor.addListener(1, (value => {
        velX.value += value.x * velMultiplier;
        velY.value -= value.y * velMultiplier;
        posX.value += velX.value;
        posY.value += velY.value;
      }))
    }

    runOnUISync(worklet)

    return () => {
      const cleanupWorklet = () => {
        "worklet"
        accelerometerData.sensor.removeListener(1);
      }

      runOnUISync(cleanupWorklet)
    }
  }, []);

  const ballAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX : posX.value },
        { translateY : posY.value },
      ]
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={ballAnimatedStyle}>
        <Ball />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
