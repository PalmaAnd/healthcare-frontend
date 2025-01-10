import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const appointments = [
  { id: '1', patient: 'John Doe', date: '2023-06-15', time: '10:00 AM' },
  { id: '2', patient: 'Jane Smith', date: '2023-06-15', time: '11:30 AM' },
  { id: '3', patient: 'Bob Johnson', date: '2023-06-16', time: '2:00 PM' },
];

export default function AppointmentsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <View>
        <Text style={styles.patientName}>{item.patient}</Text>
        <Text style={styles.appointmentTime}>{item.date} at {item.time}</Text>
      </View>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 20,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#718096',
  },
  viewButton: {
    backgroundColor: '#ebf8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewButtonText: {
    color: '#4299e1',
    fontWeight: 'bold',
  },
});