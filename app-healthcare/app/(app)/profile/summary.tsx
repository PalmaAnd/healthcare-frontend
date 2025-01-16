import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { AlertTriangle, Heart, Pill, FileWarning } from 'lucide-react-native';

import { fakePatientData } from "@/data/fakePatientData";

const patient = fakePatientData;

const PatientSummary = () => {
    const [isExpanded, setIsExpanded] = useState({
        allergies: false,
        medications: false,
        conditions: false,
    });

    const toggleSection = (section) => {
        setIsExpanded((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const formatPhoneNumber = (number) => {
        const str = number.toString();
        return `+43 ${str.slice(0, 4)} ${str.slice(4)}`;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('de-AT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const renderList = (data) =>
        data && data.length > 0 ? (
            <FlatList
                data={data}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
            />
        ) : (
            <Text style={styles.noDataText}>No data available</Text>
        );

    return (
        <View style={styles.container}>
            {/* Emergency Alert Banner */}
            {(patient.allergies?.length > 0 || patient.medical_conditions?.length > 0) && (
                <View style={styles.alertBanner}>
                    <AlertTriangle color="red" size={20} />
                    <Text style={styles.alertText}>
                        Some of your medical information requires imediate attention.
                    </Text>
                </View>
            )}

            {/* Basic Info Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Heart color="#ff6347" size={20} />
                    <Text style={styles.cardTitle}>Patient Overview</Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{patient.username}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>SVNR:</Text>
                        <Text style={styles.value}>{patient.svnr}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Birthday:</Text>
                        <Text style={styles.value}>{formatDate(patient.birthday)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Phone:</Text>
                        <Text style={styles.value}>{formatPhoneNumber(patient.phone_number)}</Text>
                    </View>
                </View>
            </View>

            {/* Medical Info Cards */}
            {['allergies', 'medications', 'conditions'].map((section, index) => (
                <View key={index} style={styles.card}>
                    <TouchableOpacity
                        style={styles.cardHeader}
                        onPress={() => toggleSection(section)}
                    >
                        {section === 'allergies' && <AlertTriangle color="#ffa500" size={20} />}
                        {section === 'medications' && <Pill color="#1e90ff" size={20} />}
                        {section === 'conditions' && <FileWarning color="#8b0000" size={20} />}
                        <Text style={styles.cardTitle}>{section.charAt(0).toUpperCase() + section.slice(1)}</Text>
                        <Text style={styles.sectionCount}>
                            {patient[section]?.length || 0}
                        </Text>
                    </TouchableOpacity>
                    {isExpanded[section] && (
                        <View style={styles.cardContent}>{renderList(patient[section])}</View>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    alertBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffe5e5',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
    alertText: {
        marginLeft: 8,
        color: 'red',
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    sectionCount: {
        marginLeft: 'auto',
        fontSize: 14,
        color: '#666',
    },
    cardContent: {
        marginTop: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#555',
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
    },
    listItem: {
        fontSize: 14,
        marginVertical: 4,
    },
    noDataText: {
        fontSize: 14,
        color: '#888',
    },
});

export default PatientSummary;
