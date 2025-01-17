import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DocumentsScreen() {
    const documents = [
        {
            title: 'Insurance Card',
            type: 'Insurance',
            date: '2024-01-10',
            icon: 'card-outline'
        },
        {
            title: 'Blood Test Results',
            type: 'Lab Results',
            date: '2024-01-05',
            icon: 'document-text-outline'
        },
        {
            title: 'Vaccination Record',
            type: 'Medical Records',
            date: '2023-12-20',
            icon: 'medical-outline'
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.uploadButton}>
                    <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
                    <Text style={styles.uploadButtonText}>Upload Document</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Documents</Text>
                {documents.map((doc, index) => (
                    <TouchableOpacity key={index} style={styles.documentCard}>
                        <View style={styles.documentIcon}>
                            <Ionicons name={doc.icon} size={32} color="#50B498" />
                        </View>
                        <View style={styles.documentInfo}>
                            <Text style={styles.documentTitle}>{doc.title}</Text>
                            <Text style={styles.documentMeta}>{doc.type} • {doc.date}</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={24} color="#718096" />
                    </TouchableOpacity>
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
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#50B498',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
    },
    uploadButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    documentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f7fafc',
        borderRadius: 12,
        marginBottom: 12,
    },
    documentIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#e6fffa',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    documentInfo: {
        flex: 1,
        marginLeft: 12,
    },
    documentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    documentMeta: {
        fontSize: 14,
        color: '#718096',
    }
});