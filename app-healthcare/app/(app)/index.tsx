import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const buttons = [
  { id: '1', title: 'Profile', icon: 'person-outline', color: '#50B498', backgroundColor: '#f0fff4', screen: 'profile' },
  { id: '2', title: 'Appointments', icon: 'calendar-outline', color: '#4299e1', backgroundColor: '#ebf8ff', screen: 'appointments' },
  { id: '3', title: 'Patient Records', icon: 'document-text-outline', color: '#50B498', backgroundColor: '#f0fff4', screen: 'records' },
  { id: '4', title: 'Med-Tracker', icon: 'medkit-outline', color: '#4299e1', backgroundColor: '#ebf8ff', screen: 'tracker' },
  { id: '5', title: 'Emergency Info', icon: 'warning-outline', color: '#e53e3e', backgroundColor: '#fff5f5', screen: 'emergency' },
  { id: '6', title: 'Health Insights', icon: 'stats-chart-outline', color: '#805ad5', backgroundColor: '#f8f5ff', screen: 'insights' },
  { id: '7', title: 'Document Vault', icon: 'folder-outline', color: '#d69e2e', backgroundColor: '#fffff0', screen: 'documents' },
  { id: '8', title: 'Medications', icon: 'fitness-outline', color: '#38a169', backgroundColor: '#f0fff4', screen: 'medications/index' }
];

const quickActions = [
  { id: 'qa1', title: 'SOS', icon: 'alert-circle', color: '#e53e3e' },
  { id: 'qa2', title: 'New Appointment', icon: 'add-circle', color: '#4299e1' },
  { id: 'qa3', title: 'Add Medication', icon: 'medical', color: '#38a169' }
];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 60) / 2;

  const renderQuickAction = ({ item }) => (
    <TouchableOpacity style={[styles.quickAction, { backgroundColor: `${item.color}20` }]}
      onPress={() => navigation.navigate(item.screen)}>
      <Ionicons name={item.icon} size={24} color={item.color} />
      <Text style={[styles.quickActionText, { color: item.color }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    const isLastRowSingle = index === buttons.length - 1 && buttons.length % 2 !== 0;
    return (
      <View style={[styles.cardWrapper, { width: isLastRowSingle ? cardWidth : cardWidth }]}>
        <TouchableOpacity style={[styles.card, { backgroundColor: item.backgroundColor, width: cardWidth, height: cardWidth }]}
          onPress={() => navigation.navigate(item.screen)}>
          <Ionicons name={item.icon} size={48} color={item.color} />
          <Text style={[styles.cardText, { color: item.color }]}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Quick Actions Scrollable Row */}
      <View style={styles.quickActionsContainer}>
        <FlatList
          data={quickActions}
          renderItem={renderQuickAction}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsList}
        />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.upcomingContainer}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <View style={styles.upcomingCard}>
            <Ionicons name="calendar" size={24} color="#4299e1" />
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingTitle}>Dr. Smith Appointment</Text>
              <Text style={styles.upcomingTime}>Today, 2:30 PM</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Access</Text>
        <FlatList
          data={buttons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.content}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  quickActionsContainer: { paddingVertical: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  quickActionsList: { paddingHorizontal: 20 },
  quickAction: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 12 },
  quickActionText: { marginLeft: 8, fontWeight: '600' },
  scrollContent: { paddingBottom: 20 },
  upcomingContainer: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2d3748', marginBottom: 12, paddingHorizontal: 20 },
  upcomingCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#ebf8ff', borderRadius: 12, marginBottom: 20 },
  upcomingInfo: { marginLeft: 12 },
  upcomingTitle: { fontSize: 16, fontWeight: '600', color: '#2d3748' },
  upcomingTime: { fontSize: 14, color: '#718096' },
  content: { paddingHorizontal: 20, paddingBottom: 20 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 16 },
  cardWrapper: { marginBottom: 16 },
  card: { justifyContent: 'center', alignItems: 'center', borderRadius: 12, padding: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84 },
  cardText: { marginTop: 8, fontSize: 16, fontWeight: 'bold', textAlign: 'center' }
});
