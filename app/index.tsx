import React from "react";
import { StyleSheet, View } from "react-native";
import Pokedex from "./screens/Pokedex";

export default function Index() {
  return (
    <View style={styles.container}>
      <Pokedex />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
