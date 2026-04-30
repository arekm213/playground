import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import SolarSystemScreen from './screens/SolarSystemScreen';
import AnimatedSvgScreen from './screens/AnimatedSvgScreen';
import BouncingBallScreen from './screens/BouncingBallScreen';
import BouncingBallSensorScreen from './screens/BouncingBallSensorScreen';
import CustomKeyboardAvoidingViewScreen from './screens/CustomKeyboardAvoidingViewScreen';
import FunTextInputScreen from './screens/FunTextInputScreen';
import ChessScreen from './screens/ChessScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Chess">
          <Stack.Screen name="Chess" component={ChessScreen} options={{ title: 'Chess' }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SolarSystem" component={SolarSystemScreen} options={{ title: 'Solar System' }} />
          <Stack.Screen name="AnimatedSvg" component={AnimatedSvgScreen} options={{ title: 'Animated SVG' }} />
          <Stack.Screen name="BouncingBall" component={BouncingBallScreen} options={{ title: 'Bouncing Ball' }} />
          <Stack.Screen name="BouncingBallSensor" component={BouncingBallSensorScreen} options={{ title: 'Bouncing Ball Sensor' }} />
          <Stack.Screen name="CustomKeyboardAvoidingView" component={CustomKeyboardAvoidingViewScreen} options={{ title: 'Custom Keyboard Avoiding View' }} />
          <Stack.Screen name="FunTextInput" component={FunTextInputScreen} options={{ title: 'Fun Text Input' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
