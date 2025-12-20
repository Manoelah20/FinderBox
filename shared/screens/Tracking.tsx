// shared/screens/Tracking.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Tracking() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rastreamento 📦</Text>
      <Text style={styles.subtitle}>
        Aqui você acompanha suas encomendas em tempo real.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666' }
});
