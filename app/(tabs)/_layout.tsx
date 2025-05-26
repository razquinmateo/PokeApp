import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Pokédex' }} />
      <Tabs.Screen name="trivia" options={{ title: 'Trivia Pokémon' }} />
      <Tabs.Screen name="adivinar" options={{ title: '¿Quién es ese Pokémon?' }} />
    </Tabs>
  );
}
