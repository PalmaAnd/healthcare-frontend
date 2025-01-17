import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const PatientProfile = () => {
    const navigation = useNavigation();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [profileData, setProfileData] = useState({
        username: '',
        phone_number: '',
        birthday: new Date(),
        gender: '',
        svnr: '',
        allergies: [],
        current_medication: [],
        medical_conditions: [],
        emergency_contact: {
            name: '',
            phone: '',
            relationship: ''
        },
        blood_type: '',
        preferred_language: '',
        insurance_provider: ''
    });

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('patientProfile');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                parsed.birthday = new Date(parsed.birthday);
                setProfileData(parsed);
            }
            setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            Alert.alert('Error', 'Failed to load profile data');
            setLoading(false);
        }
    };

    const saveProfileData = async () => {
        try {
            setLoading(true);
            await AsyncStorage.setItem('patientProfile', JSON.stringify(profileData));
            setEditing(false);
            Alert.alert('Success', 'Profile updated successfully');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            Alert.alert('Error', 'Failed to save profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleArrayInput = (text, field) => {
        const items = text.split(',').map(item => item.trim());
        setProfileData(prev => ({ ...prev, [field]: items }));
    };

    const formatArrayToString = (array) => {
        return array.join(', ');
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setProfileData(prev => ({ ...prev, birthday: date }));
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    const renderSection = (title, children) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Patient Profile</Text>
                    <Text style={styles.subtitle}>Manage your health information</Text>
                </View>
                <TouchableOpacity
                    style={[styles.editButton, editing && styles.saveButton]}
                    onPress={() => editing ? saveProfileData() : setEditing(true)}
                >
                    <Text style={styles.editButtonText}>
                        {editing ? 'Save Changes' : 'Edit Profile'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.avatarContainer}>
                {editing && (
                    <TouchableOpacity style={styles.changePhotoButton}>
                        <Text style={styles.changePhotoText}>Change Photo</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.formContainer}>
                {renderSection('Personal Information', (
                    <>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={[styles.input, !editing && styles.disabledInput]}
                            value={profileData.username}
                            onChangeText={(text) => setProfileData(prev => ({ ...prev, username: text }))}
                            editable={editing}
                            placeholder="Enter username"
                        />

                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={[styles.input, !editing && styles.disabledInput]}
                            value={profileData.phone_number}
                            onChangeText={(text) => setProfileData(prev => ({ ...prev, phone_number: text }))}
                            keyboardType="numeric"
                            editable={editing}
                            placeholder="Enter phone number"
                        />

                        <Text style={styles.label}>Birthday</Text>
                        <TouchableOpacity
                            onPress={() => editing && setShowDatePicker(true)}
                            style={[styles.input, styles.dateButton]}
                        >
                            <Text>{profileData.birthday.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={profileData.birthday}
                                mode="date"
                                onChange={handleDateChange}
                            />
                        )}

                        <Text style={styles.label}>Gender</Text>
                        <TextInput
                            style={[styles.input, !editing && styles.disabledInput]}
                            value={profileData.gender}
                            onChangeText={(text) => setProfileData(prev => ({ ...prev, gender: text }))}
                            editable={editing}
                            placeholder="Enter gender"
                        />

                        <Text style={styles.label}>Blood Type</Text>
                        <TextInput
                            style={[styles.input, !editing && styles.disabledInput]}
                            value={profileData.blood_type}
                            onChangeText={(text) => setProfileData(prev => ({ ...prev, blood_type: text }))}
                            editable={editing}
                            placeholder="Enter blood type"
                        />
                    </>
                ))}

                {renderSection('Medical Information', (
                    <>
                        <Text style={styles.label}>SVNR</Text>
                        <TextInput
                            style={[styles.input, !editing && styles.disabledInput]}
                            value={profileData.svnr}
                            onChangeText={(text) => setProfileData(prev => ({ ...prev, svnr: text }))}
                            keyboardType="numeric"
                            editable={editing}
                            placeholder="Enter SVNR"
                        />

                        <Text style={styles.label}>Insurance Provider</Text>
                        <TextInput
                            style={[styles.input, !editing && styles.disabledInput]}
                            value={profileData.insurance_provider}
                            onChangeText={(text) => setProfileData(prev => ({ ...prev, insurance_provider: text }))}
                            editable={editing}
                            placeholder="Enter insurance provider"
                        />

                        <Text style={styles.label}>Allergies (comma-separated)</Text>
                        <TextInput
                            style={[styles.input, !editing && styles.disabledInput, styles.textArea]}
                            value={formatArrayToString(profileData.allergies)}
                            onChangeText={(text) => handleArrayInput(text, 'allergies')}
                            editable={editing}
                            multiline
                            placeholder="Enter allergies"
                        />

                        <Text style={styles.label}>Current Medication (comma-separated)</Text>
                        <TextInput
                            style={[styles.input, !editing && styles.disabledInput, styles.textArea]}
                            value={formatArrayToString(profileData.current_medication)}
                            onChangeText={(text) => handleArrayInput(text, 'current_medication')}
                            editable={editing}
                            multiline
                            placeholder="Enter current medications"
                        />

                        <Text style={styles.label}>Medical Conditions (comma-separated)</Text>
                        <TextInput
                            style={[styles.input, !editing && styles.disabledInput, styles.textArea]}
                            value={formatArrayToString(profileData.medical_conditions)}
                            onChangeText={(text) => handleArrayInput(text, 'medical_conditions')}
                            editable={editing}
                            multiline
                            placeholder="Enter medical conditions"
                        />
                    </>
                ))}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerLink}
                    onPress={() => navigation.navigate('impressum')}
                >
                    <Text style={styles.footerLinkText}>Impressum</Text>
                </TouchableOpacity>
                <Text style={styles.footerDivider}>|</Text>
                <TouchableOpacity
                    style={styles.footerLink}
                    onPress={() => navigation.navigate('profile/legal_notice')}
                >
                    <Text style={styles.footerLinkText}>Legal Notice</Text>
                </TouchableOpacity>
            </View>
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
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    avatarContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePhotoButton: {
        marginTop: 8,
        padding: 8,
    },
    changePhotoText: {
        color: '#007AFF',
        fontSize: 14,
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    sectionContent: {
        padding: 16,
    },
    formContainer: {
        padding: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    disabledInput: {
        backgroundColor: '#f5f5f5',
        color: '#666',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    editButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#34C759',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    dateButton: {
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    footerLink: {
        padding: 8,
    },
    footerLinkText: {
        color: '#007AFF',
        fontSize: 14,
    },
    footerDivider: {
        color: '#666',
        marginHorizontal: 8,
    },
});

export default PatientProfile;