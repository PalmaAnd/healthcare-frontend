import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Quick Actions</Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#ebf8ff' }]}
            onPress={() => navigation.navigate('Appointments')}
          >
            <Ionicons name="calendar-outline" size={48} color="#4299e1" />
            <Text style={[styles.cardText, { color: '#4299e1' }]}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#f0fff4' }]}
            onPress={() => navigation.navigate('Records')}
          >
            <Ionicons name="document-text-outline" size={48} color="#48bb78" />
            <Text style={[styles.cardText, { color: '#48bb78' }]}>Patient Records</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate('Impressum')}
      >
        <Text style={styles.footerText}>Impressum</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerText: {
    textAlign: 'center',
    color: '#718096',
    fontSize: 14,
  },
});

