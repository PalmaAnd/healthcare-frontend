import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function ImpressumScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Legal Information</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Company Name:</Text>
          <Text style={styles.infoText}>Company GmbH</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoText}>Where the streets have no name, ONE LOVE, Austria</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoText}>+00 11 8811 0000 </Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>mail@mc.mailface</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Managing Directors:</Text>
          <Text style={styles.infoText}>Dr. No, Dr. Donothing</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Commercial Register:</Text>
          <Text style={styles.infoText}>AMTSGERICHT Smth, Register number 123456</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>VAT ID:</Text>
          <Text style={styles.infoText}>AT000000001</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Responsible for content:</Text>
          <Text style={styles.infoText}>Dr. Dolittle</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  infoText: {
    fontSize: 16,
    color: '#718096',
  },
});