import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MedicationsScreen() {
    const medications = [
        {
            name: 'Aspirin',
            dosage: '81mg',
            schedule: 'Daily',
            timeSlots: ['8:00'],
            refill: '5 days remaining'
        },
        {
            name: 'Lisinopril',
            dosage: '10mg',
            schedule: 'Twice Daily',
            timeSlots: ['8:00', '20:00'],
            refill: '12 days remaining'
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add-outline" size={24} color="#fff" />
                    <Text style={styles.addButtonText}>Add Medication</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Today's Schedule</Text>
                {medications.map((med, index) => (
                    <View key={index} style={styles.medicationCard}>
                        <View style={styles.medicationHeader}>
                            <Text style={styles.medicationName}>{med.name}</Text>
                            <Text style={styles.medicationDosage}>{med.dosage}</Text>
                        </View>
                        <View style={styles.scheduleContainer}>
                            {med.timeSlots.map((time, timeIndex) => (
                                <View key={timeIndex} style={styles.timeSlot}>
                                    <Ionicons name="time-outline" size={20} color="#718096" />
                                    <Text style={styles.timeText}>{time}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.refillInfo}>
                            <Ionicons name="alert-circle-outline" size={20} color="#d69e2e" />
                            <Text style={styles.refillText}>{med.refill}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 16,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#50B498',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    medicationCard: {
        padding: 16,
        backgroundColor: '#f7fafc',
        borderRadius: 12,
        marginBottom: 12,
    },
    medicationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    medicationDosage: {
        fontSize: 16,
        color: '#718096',
    },
    scheduleContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    timeSlot: {
        flexDirection: 'row',
    }
});