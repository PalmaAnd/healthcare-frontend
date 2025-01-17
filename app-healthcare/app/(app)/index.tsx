import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const buttons = [
  {
    id: '1',
    title: 'Profile',
    icon: 'person-outline',
    color: '#50B498',
    backgroundColor: '#f0fff4',
    screen: 'profile',
  },
  {
    id: '2',
    title: 'Appointments',
    icon: 'calendar-outline',
    color: '#4299e1',
    backgroundColor: '#ebf8ff',
    screen: 'appointments',
  },
  {
    id: '3',
    title: 'Patient Records',
    icon: 'document-text-outline',
    color: '#50B498',
    backgroundColor: '#f0fff4',
    screen: 'records',
  },
  {
    id: '4',
    title: 'Med-Tracker',
    icon: 'medkit-outline',
    color: '#4299e1',
    backgroundColor: '#ebf8ff',
    screen: 'tracker',
  },
  // Weitere bei bedarf hinzufügen
];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  // Dynamische Button-Breite für 2 Spalten
  const cardWidth = (screenWidth - 60) / 2; // 60 = Padding (20px links + rechts) + Spaltenabstand

  const renderItem = ({ item, index }: { item: typeof buttons[0]; index: number }) => {
    // Zentrum für letzten Button bei ungerader Anzahl
    const isLastRowSingle = index === buttons.length - 1 && buttons.length % 2 !== 0;

    return (
      <View
        style={[
          styles.cardWrapper,
          {
            width: isLastRowSingle ? cardWidth : cardWidth, // Gleiche Breite für alle Buttons
            alignSelf: isLastRowSingle ? 'center' : 'flex-start',
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.card, { backgroundColor: item.backgroundColor, width: cardWidth, height: cardWidth }]}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Ionicons name={item.icon} size={48} color={item.color} />
          <Text style={[styles.cardText, { color: item.color }]}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
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
});
