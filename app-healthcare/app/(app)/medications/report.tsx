import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

interface SideEffect {
    id: string;
    medicationName: string;
    symptom: string;
    severity: 'mild' | 'moderate' | 'severe';
    dateReported: Date;
    notes: string;
}

export default function MedicationSideEffectReporter() {
    const [medicationName, setMedicationName] = useState('');
    const [symptom, setSymptom] = useState('');
    const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        if (!medicationName || !symptom) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        const sideEffect: SideEffect = {
            id: Date.now().toString(),
            medicationName,
            symptom,
            severity,
            dateReported: new Date(),
            notes
        };

        // Here you would typically save to your backend/storage
        Alert.alert('Success', 'Side effect reported successfully');
        resetForm();
    };

    const resetForm = () => {
        setMedicationName('');
        setSymptom('');
        setSeverity('mild');
        setNotes('');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <AlertTriangle size={24} color="#FF4444" />
                <Text style={styles.headerText}>Report Side Effect</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Medication Name *</Text>
                <TextInput
                    style={styles.input}
                    value={medicationName}
                    onChangeText={setMedicationName}
                    placeholder="Enter medication name"
                />

                <Text style={styles.label}>Symptom *</Text>
                <TextInput
                    style={styles.input}
                    value={symptom}
                    onChangeText={setSymptom}
                    placeholder="Describe the side effect"
                />

                <Text style={styles.label}>Severity</Text>
                <View style={styles.severityButtons}>
                    {(['mild', 'moderate', 'severe'] as const).map((level) => (
                        <TouchableOpacity
                            key={level}
                            style={[
                                styles.severityButton,
                                severity === level && styles.selectedSeverity
                            ]}
                            onPress={() => setSeverity(level)}
                        >
                            <Text style={[
                                styles.severityButtonText,
                                severity === level && styles.selectedSeverityText
                            ]}>
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Additional Notes</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Add any additional details"
                    multiline
                    numberOfLines={4}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit Report</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    articleCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    articleImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    articleContent: {
        padding: 16,
    },
    category: {
        color: '#4169E1',
        fontSize: 14,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    summary: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    articleFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metadata: {
        fontSize: 12,
        color: '#999',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareButton: {
        marginLeft: 16,
    },
    form: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    severityButtons: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    severityButton: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    selectedSeverity: {
        backgroundColor: '#4169E1',
        borderColor: '#4169E1',
    },
    severityButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedSeverityText: {
        color: '#ffffff',
    },
    submitButton: {
        backgroundColor: '#4169E1',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    moodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 24,
    },
    moodButton: {
        alignItems: 'center',
    },
    moodText: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
    },
    timeSelector: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    timeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#f0f0f0',
    },
    selectedTime: {
        backgroundColor: '#FFE4B5',
    },
    timeButtonText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chartContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 24,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    resultCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    testName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultValue: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4169E1',
    },
    unit: {
        fontSize: 16,
        color: '#666',
        marginLeft: 4,
    },
    referenceRange: {
        fontSize: 14,
        color: '#666',
    }
});