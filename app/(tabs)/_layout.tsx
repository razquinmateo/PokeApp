import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokédex',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/pokedex-icon.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#FF0000' : '#666',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trivia"
        options={{
          title: 'Trivia',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/trivia-icon.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#FF0000' : '#666',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="adivinar"
        options={{
          title: '¿Quién?',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/guess-icon.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#FF0000' : '#666',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}