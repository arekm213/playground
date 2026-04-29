import { useRef } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import { runOnRuntime, scheduleOnRN } from 'react-native-worklets';

export default function FunTextInputScreen() {
  const buttonProgress = useSharedValue(1);
  const buttonYPos = useSharedValue(0);
  const textInputState = useSharedValue(0);
  const textInputRotation = useSharedValue(0);
  const valueRef = useRef('');

  const validateInput = () => {
    if(!valueRef || !valueRef.current){
      return;
    }
    if(valueRef.current.length > 3){
      textInputRotation.value = withRepeat(withTiming(100, {duration: 20}), 20, true);
      textInputState.value = withTiming(-1, {duration: 100});
    } else {
      textInputState.value = withTiming(1, {duration: 500});
    }
  }

  const tap = Gesture.Tap().onStart(() => {
    buttonProgress.value = withTiming(0.5);
  }).onEnd(() => {
    buttonProgress.value = withTiming(1);
    buttonYPos.value = withRepeat(withSpring(30, {duration: 100}), 2, true);
    scheduleOnRN(validateInput)
  });
  const longPress = Gesture.LongPress().onStart(() => {
    buttonProgress.value = withTiming(1.5);
    buttonYPos.value = withRepeat(withSpring(-60, {duration: 100}), 2, true);
  }).onEnd(() => {
    buttonProgress.value = withTiming(2);
    buttonYPos.value = withRepeat(withSpring(-30, {duration: 100}), 2, true);
    scheduleOnRN(validateInput)
  });
  const composed = Gesture.Exclusive(longPress, tap);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
        buttonProgress.value,
        [0.5, 1, 1.5, 2],
        ['red', 'green', 'yellow', 'blue']
      )

    return {
      backgroundColor: backgroundColor,
      transform: [
        {scale: buttonProgress.value},
        {translateY: buttonYPos.value}
      ]
    }
  });

  const animatedTextInputStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        textInputState.value,
        [-1, 0, 1],
        ['red', 'white', 'green']
      )
    return {
      backgroundColor: backgroundColor,
      transform: [
        {rotateZ: `${textInputRotation.value}deg`}
      ]
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <GestureDetector gesture={composed}>
          <Animated.View style={buttonAnimatedStyle}>
            <Button title="Press me" onPress={() => {}} />
          </Animated.View>
        </GestureDetector>
        <Animated.View style={animatedTextInputStyle}>
          <TextInput style={styles.input} placeholder="Type..." onChangeText={(t) => { valueRef.current = t; }} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 160,
  },
});
