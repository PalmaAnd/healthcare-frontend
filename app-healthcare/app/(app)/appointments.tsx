import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { List, Card, Paragraph, Title, Chip, Button, Searchbar, useTheme } from 'react-native-paper';
import uuid from 'react-native-uuid';

// Mock data
const appointments = [
  {
    id: '1',
    caseNumber: uuid.v4(),
    doctor: 'Dr. Gregory House',
    date: '2023-06-15',
    time: '10:00 AM',
    title: 'Follow-up Consultation',
    description: 'Review progress and adjust treatment plan',
    currentMedication: 'Lisinopril 10mg daily',
    urgency: 'medium',
    updatedAt: '2023-06-14T15:30:00Z',
  },
  {
    id: '2',
    caseNumber: uuid.v4(),
    doctor: 'Dr. Meredith Grey',
    date: '2023-06-15',
    time: '11:30 AM',
    title: 'Annual Check-up',
    description: 'Routine physical examination and health screening',
    currentMedication: 'None',
    urgency: 'low',
    updatedAt: '2023-06-13T09:45:00Z',
  },
  {
    id: '3',
    caseNumber: uuid.v4(),
    doctor: 'Dr. Anikin Skywalker',
    date: '2023-06-16',
    time: '2:00 PM',
    title: 'Emergency Consultation',
    description: 'Hand injury from lightsaber duel',
    currentMedication: 'Ibuprofen 400mg as needed',
    urgency: 'high',
    updatedAt: '2023-06-16T13:15:00Z',
  },
];

export default function AppointmentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'low':
        return '#388E3C';
      case 'medium':
        return '#FFA000';
      case 'high':
        return '#D32F2F';
      default:
        return '#757575';
    }
  };

  const openDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setSelectedAppointment(null);
    setModalVisible(false);
  };

  const renderAppointment = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Title>{item.doctor}</Title>
          <Chip style={{ backgroundColor: getUrgencyColor(item.urgency), borderColor: getUrgencyColor(item.urgency) }}>
            {item.urgency.toUpperCase()}
          </Chip>
        </View>
        <Paragraph style={styles.subtitle}>{item.title}</Paragraph>
        <Paragraph>{`${item.date} at ${item.time}`}</Paragraph>
        <Paragraph style={styles.updatedAt}>Updated: {new Date(item.updatedAt).toLocaleString()}</Paragraph>
        <Paragraph style={styles.description}>{item.description}</Paragraph>
        <List.Item title="Current Medication" description={item.currentMedication} left={(props) => <List.Icon {...props} icon="pill" />} />
        <View style={styles.footer}>
          <Paragraph style={styles.caseNumber}>Case: {item.caseNumber}</Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => openDetails(item)}>View Details</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search appointments" onChangeText={setSearchQuery} value={searchQuery} style={styles.searchBar} />
      <FlatList data={filteredAppointments} renderItem={renderAppointment} keyExtractor={(item) => item.id} contentContainerStyle={styles.listContent} />

      {/* Details Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedAppointment && (
              <>
                <Title>{selectedAppointment.doctor}</Title>
                <Chip style={{ backgroundColor: getUrgencyColor(selectedAppointment.urgency), marginBottom: 10 }}>
                  {selectedAppointment.urgency.toUpperCase()}
                </Chip>
                <Paragraph style={styles.subtitle}>{selectedAppointment.title}</Paragraph>
                <Paragraph>{`${selectedAppointment.date} at ${selectedAppointment.time}`}</Paragraph>
                <Paragraph style={styles.updatedAt}>Updated: {new Date(selectedAppointment.updatedAt).toLocaleString()}</Paragraph>
                <Paragraph style={styles.description}>{selectedAppointment.description}</Paragraph>
                <List.Item title="Current Medication" description={selectedAppointment.currentMedication} left={(props) => <List.Icon {...props} icon="pill" />} />
                <Paragraph style={styles.caseNumber}>Case: {selectedAppointment.caseNumber}</Paragraph>
                <Button mode="contained" onPress={closeDetails} style={styles.closeButton}>
                  Close
                </Button>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    margin: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    margin: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    marginTop: 8,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  caseNumber: {
    fontSize: 12,
    color: '#666',
  },
  updatedAt: {
    fontSize: 12,
    color: '#666',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  closeButton: {
    marginTop: 10,
  },
});

