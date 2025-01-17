import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Searchbar, Chip, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

// Mock data for a single person's cases
const personalCases = [
  { id: 'c1', title: 'Flu Symptoms', status: 'Closed', openedDate: '2023-05-10', closedDate: '2023-05-20', doctor: 'Dr. Smith' },
  { id: 'c2', title: 'Annual Check-up', status: 'Open', openedDate: '2023-06-10', doctor: 'Dr. Johnson' },
  { id: 'c3', title: 'Sprained Ankle', status: 'Closed', openedDate: '2023-04-01', closedDate: '2023-04-15', doctor: 'Dr. Brown' },
  { id: 'c4', title: 'Allergy Consultation', status: 'Open', openedDate: '2023-06-05', doctor: 'Dr. Davis' },
  { id: 'c5', title: 'Back Pain', status: 'Closed', openedDate: '2023-03-15', closedDate: '2023-03-30', doctor: 'Dr. Wilson' },
];

export default function RecordsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const theme = useTheme();

  const filteredCases = personalCases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCase = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Doctor: {item.doctor}</Paragraph>
        <Paragraph>Opened: {item.openedDate}</Paragraph>
        {item.status === 'Closed' && <Paragraph>Closed: {item.closedDate}</Paragraph>}
        <Chip 
          mode="outlined" 
          style={{ 
            marginTop: 8,
            borderColor: item.status === 'Open' ? theme.colors.primary : theme.colors.accent 
          }}
        >
          {item.status}
        </Chip>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => router.push(`/case-details/${item.id}`)}>View Details</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.screenTitle}>My Medical Records</Title>
      <Searchbar
        placeholder="Search cases or doctors"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredCases}
        renderItem={renderCase}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
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
});

