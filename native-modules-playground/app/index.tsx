import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const SCREENS = [{ title: 'Use Screen Orientation', href: '/use-screen-orientation' }] as const;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {SCREENS.map((screen) => (
        <Link key={screen.href} href={screen.href} asChild>
          <Text style={styles.item}>{screen.title}</Text>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    paddingVertical: 14,
    fontSize: 16,
  },
});
