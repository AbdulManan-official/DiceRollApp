import React, { useState, useRef } from "react";
import { StyleSheet, View,  Text, TouchableOpacity, Vibration, Animated, Easing } from "react-native";

const diceImages = {
  1: require("./assets/1.png"),
  2: require("./assets/2.png"),
  3: require("./assets/3.png"),
  4: require("./assets/4.png"),
  5: require("./assets/5.png"),
  6: require("./assets/6.png"),
};

export default function App() {
  const [diceNumber, setDiceNumber] = useState(1);
  const spinValue = useRef(new Animated.Value(0)).current;

  const rollDice = () => {
    const n = Math.floor(Math.random() * 6) + 1;

    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      spinValue.setValue(0);
      setDiceNumber(n);
      if (n === 6) Vibration.vibrate(200);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 Dice Roll App</Text>
      <Animated.Image
        source={diceImages[diceNumber]}
        style={[styles.diceImage, { transform: [{ rotate: spin }] }]}
      />
      <TouchableOpacity style={styles.button} onPress={rollDice}>
        <Text style={styles.buttonText}>Roll Dice</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f9fa", padding: 20 },
  title: { fontSize: 28, fontWeight: "800", color: "#e63946", marginBottom: 36 },
  diceImage: {
    width: 200,
    height: 200,
    marginBottom: 36,
    borderRadius: 35,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  button: {
    backgroundColor: "#e63946",
    paddingVertical: 16,
    paddingHorizontal: 44,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "700", letterSpacing: 1 },
});
