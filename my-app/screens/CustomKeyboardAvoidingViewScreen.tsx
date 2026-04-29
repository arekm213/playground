import { useRef } from 'react';
import { Image, StyleSheet, TextInput, View, Keyboard, Pressable, Dimensions } from 'react-native';
import Animated, { KeyboardState, measure, useAnimatedKeyboard, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function CustomKeyboardAvoidingViewScreen() {

  const {height, state} = useAnimatedKeyboard();
  const animatedOffset = useSharedValue(0);
  const focusedInputDistanceToBottom = useSharedValue(0);

  useAnimatedReaction(
    () => {
      return height.value
    },
    (currentValue, previousValue) => {
      animatedOffset.value = withTiming(currentValue > 0 ? currentValue - focusedInputDistanceToBottom.value : 0, {duration: 100})
    },
    []
  );

  const animatedStyle = useAnimatedStyle(()=>{
    return {
      transform: [
        {
          translateY: -animatedOffset.value,
        }
      ]
    }
  });

  const inputRef = useRef<TextInput>(null);
  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <Animated.View style={[styles.container, animatedStyle]}>
          <TextInput
            ref={inputRef}  
            style={styles.input}
            placeholder="Type something..."
            placeholderTextColor="#999"
            onFocus={(event) => {
              inputRef.current?.measureInWindow((x, y, w, h) => {
                const height = Dimensions.get('screen').height;
                const bottomOfInput = y + h + 5;
                focusedInputDistanceToBottom.value = height - bottomOfInput;
              });
            }}
          />
          <Image
            source={require('../assets/icon.png')}
            style={styles.image}
            resizeMode="contain"
          />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  bottom: {
    padding: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 120,
  },
});
