// shared/screens/About.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o FinderBox ℹ️</Text>
      <Text style={styles.subtitle}>
        O FinderBox é um app moderno para rastrear encomendas de múltiplas transportadoras em um só lugar.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#444' }
});
