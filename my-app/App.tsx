import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import SolarSystemScreen from './screens/SolarSystemScreen';
import AnimatedSvgScreen from './screens/AnimatedSvgScreen';
import type { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SolarSystem" component={SolarSystemScreen} options={{ title: 'Solar System' }} />
        <Stack.Screen name="AnimatedSvg" component={AnimatedSvgScreen} options={{ title: 'Animated SVG' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
