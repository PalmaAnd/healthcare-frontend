import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Clock, Plus, Check, AlertCircle, Pill, Calendar } from 'lucide-react-native';

const MedicationTracker = () => {
    const [loading, setLoading] = useState(true);
    const [medications, setMedications] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMedication, setNewMedication] = useState({
        name: '',
        dosage: '',
        frequency: '',
        timeOfDay: [],
        startDate: new Date(),
        endDate: null,
        inventory: 0,
        notes: '',
        history: []
    });

    useEffect(() => {
        loadMedications();
        const interval = setInterval(checkMedications, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const loadMedications = async () => {
        try {
            const saved = await AsyncStorage.getItem('medications');
            if (saved) {
                const parsed = JSON.parse(saved);
                setMedications(parsed);
            }
            setLoading(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to load medications');
            setLoading(false);
        }
    };

    const saveMedications = async (updatedMeds) => {
        try {
            await AsyncStorage.setItem('medications', JSON.stringify(updatedMeds));
        } catch (error) {
            Alert.alert('Error', 'Failed to save medications');
        }
    };

    const addMedication = async () => {
        if (!newMedication.name || !newMedication.dosage || !newMedication.frequency) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        const updatedMedications = [...medications, {
            ...newMedication,
            id: Date.now().toString(),
            history: [],
            lastTaken: null
        }];

        setMedications(updatedMedications);
        await saveMedications(updatedMedications);
        setShowAddForm(false);
        setNewMedication({
            name: '',
            dosage: '',
            frequency: '',
            timeOfDay: [],
            startDate: new Date(),
            endDate: null,
            inventory: 0,
            notes: '',
            history: []
        });
    };

    const takeMedication = async (medicationId) => {
        const updatedMedications = medications.map(med => {
            if (med.id === medicationId) {
                return {
                    ...med,
                    lastTaken: new Date(),
                    inventory: Math.max(0, med.inventory - 1),
                    history: [...med.history, {
                        date: new Date(),
                        action: 'taken'
                    }]
                };
            }
            return med;
        });

        setMedications(updatedMedications);
        await saveMedications(updatedMedications);
    };

    const checkMedications = () => {
        const now = new Date();
        medications.forEach(med => {
            if (med.inventory <= 3) {
                Alert.alert(
                    'Low Medication Inventory',
                    `You're running low on ${med.name}. Only ${med.inventory} doses remaining.`
                );
            }
        });
    };

    const calculateNextDose = (medication) => {
        if (!medication.lastTaken) return 'Not taken yet';
        const lastTaken = new Date(medication.lastTaken);
        const frequency = parseInt(medication.frequency);
        const nextDose = new Date(lastTaken.getTime() + (frequency * 60 * 60 * 1000));
        return nextDose.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const renderMedicationCard = (medication) => (
        <View style={styles.medicationCard} key={medication.id}>
            <View style={styles.medicationHeader}>
                <View style={styles.medicationInfo}>
                    <Text style={styles.medicationName}>{medication.name}</Text>
                    <Text style={styles.medicationDosage}>{medication.dosage}</Text>
                </View>
                <TouchableOpacity
                    style={styles.takeButton}
                    onPress={() => takeMedication(medication.id)}
                >
                    <Check size={20} color="#fff" />
                    <Text style={styles.takeButtonText}>Take</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.medicationDetails}>
                <View style={styles.detailRow}>
                    <Clock size={16} color="#666" />
                    <Text style={styles.detailText}>
                        Next dose: {calculateNextDose(medication)}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Pill size={16} color="#666" />
                    <Text style={styles.detailText}>
                        Remaining: {medication.inventory} doses
                    </Text>
                </View>
                {medication.notes && (
                    <View style={styles.notesContainer}>
                        <Text style={styles.notes}>{medication.notes}</Text>
                    </View>
                )}
            </View>

            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Recent History</Text>
                {medication.history.slice(-3).map((entry, index) => (
                    <Text key={index} style={styles.historyEntry}>
                        {new Date(entry.date).toLocaleString()}
                    </Text>
                ))}
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Medication Tracker</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowAddForm(true)}
                >
                    <Plus size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {medications.length === 0 ? (
                <View style={styles.emptyState}>
                    <Pill size={48} color="#666" />
                    <Text style={styles.emptyStateText}>No medications tracked</Text>
                    <Text style={styles.emptyStateSubtext}>Add your medications to start tracking</Text>
                </View>
            ) : (
                <View style={styles.medicationsList}>
                    {medications.map(renderMedicationCard)}
                </View>
            )}

            {showAddForm && (
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Add New Medication</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Medication Name"
                        value={newMedication.name}
                        onChangeText={(text) => setNewMedication(prev => ({ ...prev, name: text }))}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Dosage (e.g., 50mg)"
                        value={newMedication.dosage}
                        onChangeText={(text) => setNewMedication(prev => ({ ...prev, dosage: text }))}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Frequency (hours between doses)"
                        value={newMedication.frequency}
                        onChangeText={(text) => setNewMedication(prev => ({ ...prev, frequency: text }))}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Initial Inventory (number of doses)"
                        value={newMedication.inventory.toString()}
                        onChangeText={(text) => setNewMedication(prev => ({ ...prev, inventory: parseInt(text) || 0 }))}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Notes (optional)"
                        value={newMedication.notes}
                        onChangeText={(text) => setNewMedication(prev => ({ ...prev, notes: text }))}
                        multiline
                    />

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={() => setShowAddForm(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.saveButton]}
                            onPress={addMedication}
                        >
                            <Text style={styles.saveButtonText}>Add Medication</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#007AFF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medicationCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    medicationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    medicationInfo: {
        flex: 1,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    medicationDosage: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    takeButton: {
        backgroundColor: '#34C759',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
    },
    takeButtonText: {
        color: '#fff',
        marginLeft: 4,
        fontWeight: '600',
    },
    medicationDetails: {
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#444',
    },
    notesContainer: {
        backgroundColor: '#f8f8f8',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    notes: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    historyContainer: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 12,
        marginTop: 12,
    },
    historyTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    historyEntry: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 16,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        margin: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#007AFF',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default MedicationTracker;