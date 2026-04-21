import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Planet, { type PlanetProps } from '../components/Planet';

type PlanetData = PlanetProps & { name: string };

const PLANET_SIZE = 30;

const PLANETS: PlanetData[] = [
  { name: 'Sun', r: 0, v1: 0, v2: 2.0, size: PLANET_SIZE, source: require('../assets/planets/sun.jpg') },
  { name: 'Mercury', r: 1, v1: 47.87, v2: 0.003, size: PLANET_SIZE, source: require('../assets/planets/mercury.jpg') },
  { name: 'Venus', r: 2, v1: 35.02, v2: 0.0018, size: PLANET_SIZE, source: require('../assets/planets/venus.jpg') },
  { name: 'Earth', r: 3, v1: 29.78, v2: 0.465, size: PLANET_SIZE, source: require('../assets/planets/earth.jpg') },
  { name: 'Mars', r: 4, v1: 24.08, v2: 0.241, size: PLANET_SIZE, source: require('../assets/planets/mars.jpg') },
  { name: 'Jupiter', r: 5, v1: 13.07, v2: 12.6, size: PLANET_SIZE, source: require('../assets/planets/jupiter.jpg') },
  { name: 'Saturn', r: 6, v1: 9.68, v2: 10.0, size: PLANET_SIZE, source: require('../assets/planets/saturn.jpg') },
  { name: 'Uranus', r: 7, v1: 6.80, v2: 2.59, size: PLANET_SIZE, source: require('../assets/planets/uranus.jpg') },
  { name: 'Neptune', r: 8, v1: 5.43, v2: 2.68, size: PLANET_SIZE, source: require('../assets/planets/neptune.jpg') },
];

export default function SolarSystemScreen() {
  return (
    <View style={styles.container}>
      {PLANETS.map((p) => (
          <Planet r={p.r} v1={p.v1} v2={p.v2} size={p.size} source={p.source} key={p.name} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // alignItems: 'center',
    justifyContent:'center',
    paddingVertical: 24,
    gap: 24,
    alignItems:'center',
    transform: [
      // {rotateX: '-20deg'}
    ]
  },
  row: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
});
