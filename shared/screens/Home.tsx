// shared/screens/Home.tsx
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FinderBox 🚀</Text>
      <Text style={styles.subtitle}>
        Bem-vinda à versão {Platform.OS === 'web' ? 'Web 🌐' : 'Mobile 📱'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 18, color: '#555' }
});

