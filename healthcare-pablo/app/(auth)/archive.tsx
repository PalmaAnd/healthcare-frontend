import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const patients = [
  { id: '1', name: 'John Doe', dob: '1980-05-15' },
  { id: '2', name: 'Jane Smith', dob: '1992-11-22' },
  { id: '3', name: 'Bob Johnson', dob: '1975-03-08' },
];

export default function ArchiveScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }) => (
    <View style={styles.patientItem}>
      <View>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.patientDob}>DOB: {item.dob}</Text>
      </View>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View Record</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#718096" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search patients"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={patients}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContent: {
    padding: 20,
  },
  patientItem: {
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
  patientDob: {
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

