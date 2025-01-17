import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EmergencyScreen() {
    const emergencyContacts = [
        { name: 'Dr. Smith', role: 'Primary Doctor', phone: '+43 1234 567890' },
        { name: 'Maria Weber', role: 'Emergency Contact', phone: '+43 2345 678901' },
    ];

    const medicalAlerts = [
        { type: 'Allergy', description: 'Penicillin - Severe' },
        { type: 'Condition', description: 'Type 1 Diabetes' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.qrSection}>
                <View style={styles.qrPlaceholder}>
                    <Ionicons name="qr-code-outline" size={100} color="#718096" />
                    <Text style={styles.qrText}>Emergency Medical QR Code</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Emergency Contacts</Text>
                {emergencyContacts.map((contact, index) => (
                    <TouchableOpacity key={index} style={styles.contactCard}>
                        <Ionicons name="person-circle-outline" size={32} color="#50B498" />
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactName}>{contact.name}</Text>
                            <Text style={styles.contactRole}>{contact.role}</Text>
                            <Text style={styles.contactPhone}>{contact.phone}</Text>
                        </View>
                        <Ionicons name="call-outline" size={24} color="#50B498" />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Medical Alerts</Text>
                {medicalAlerts.map((alert, index) => (
                    <View key={index} style={styles.alertCard}>
                        <Ionicons name="warning-outline" size={24} color="#e53e3e" />
                        <View style={styles.alertInfo}>
                            <Text style={styles.alertType}>{alert.type}</Text>
                            <Text style={styles.alertDescription}>{alert.description}</Text>
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
    qrSection: {
        padding: 20,
        alignItems: 'center',
    },
    qrPlaceholder: {
        width: 200,
        height: 200,
        backgroundColor: '#f7fafc',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrText: {
        marginTop: 8,
        color: '#718096',
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f7fafc',
        borderRadius: 12,
        marginBottom: 12,
    },
    contactInfo: {
        flex: 1,
        marginLeft: 12,
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    contactRole: {
        fontSize: 14,
        color: '#718096',
    },
    contactPhone: {
        fontSize: 14,
        color: '#4299e1',
    },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff5f5',
        borderRadius: 12,
        marginBottom: 12,
    },
    alertInfo: {
        marginLeft: 12,
    },
    alertType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e53e3e',
    },
    alertDescription: {
        fontSize: 14,
        color: '#718096',
    },
    // Insights Screen Styles
    metricCard: {
        padding: 16,
        backgroundColor: '#f7fafc',
        borderRadius: 12,
        marginBottom: 12,
    },
    metricHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metricTitle: {
        fontSize: 16,
        color: '#2d3748',
    },
    metricValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3748',
        marginTop: 8,
    },
    metricUnit: {
        fontSize: 16,
        color: '#718096',
    },
    symptomCard: {
        padding: 16,
        backgroundColor: '#f7fafc',
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    symptomDate: {
        fontSize: 14,
        color: '#718096',
    },
    symptomDescription: {
        flex: 1,
        marginHorizontal: 12,
        fontSize: 16,
        color: '#2d3748',
    },
    severityIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    }
});