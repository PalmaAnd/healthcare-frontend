import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Smile, Frown, Meh, Sun, Moon } from 'lucide-react-native';

interface MoodEntry {
    date: Date;
    mood: number; // 1-5
    notes?: string;
    timeOfDay: 'morning' | 'evening';
}

export default function MoodTracker() {
    const [moodData] = useState({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            data: [3, 4, 2, 5, 3, 4, 4]
        }]
    });

    const renderMoodSelection = () => (
        <View style={styles.moodContainer}>
            <TouchableOpacity style={styles.moodButton}>
                <Frown size={32} color="#FF4444" />
                <Text style={styles.moodText}>Bad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moodButton}>
                <Meh size={32} color="#FFA500" />
                <Text style={styles.moodText}>Okay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moodButton}>
                <Smile size={32} color="#32CD32" />
                <Text style={styles.moodText}>Great</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.timeSelector}>
                <TouchableOpacity style={[styles.timeButton, styles.selectedTime]}>
                    <Sun size={20} color="#FFA500" />
                    <Text style={styles.timeButtonText}>Morning</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeButton}>
                    <Moon size={20} color="#666" />
                    <Text style={styles.timeButtonText}>Evening</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.question}>How are you feeling today?</Text>
            {renderMoodSelection()}

            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Your Mood This Week</Text>
                <LineChart
                    data={moodData}
                    width={350}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                />
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
})